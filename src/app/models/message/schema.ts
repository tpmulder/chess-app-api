import Mongoose from "mongoose";
import { Message } from "./interface";
import paginationPlugin from 'mongoose-paginate-v2';
import { BaseSchema, SchemaModelBase } from "../base/baseSchema";
import { getValidReferences } from "../../utils/helpers/getValidReferences";
import UserSchema from '../user/schema';
import RoomSchema from '../room/schema';

export interface MessageModel extends SchemaModelBase<Message> {

}

const messageSchema = new BaseSchema({
    text: {
        type: String, required: true, maxlength: 200
    },
    sentOn: {
        type: Date, default: new Date()
    },
    updatedAt: {
        type: Date, required: false
    },
    room: {
        ref: 'Room', type: Mongoose.Schema.Types.ObjectId, required: true
    },
    sender: {
        ref: 'User', type: Mongoose.Schema.Types.ObjectId, required: true
    }
});
messageSchema.pre<Message>('findOneAndUpdate', function(next) {
    this.set('sender', undefined);
    this.set('room', undefined);
    this.set('updatedAt', new Date());
});

messageSchema.pre<Message>('save', async function() {
    const userPath = 'user';
    const roomPath = 'room';

    if(this.isModified(userPath))
        this.set(userPath, (await getValidReferences([this.get(userPath) as string], UserSchema, userPath))[0]);

    if(this.isModified(roomPath))
        this.set(roomPath, (await getValidReferences([this.get(roomPath) as string], RoomSchema, roomPath))[0]);
});

messageSchema.plugin(paginationPlugin);

export default Mongoose.model<Message, MessageModel>("Message", messageSchema);