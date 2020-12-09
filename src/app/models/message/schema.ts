import Mongoose from "mongoose";
import Message from "./interface";
import paginationPlugin from 'mongoose-paginate-v2';
import BaseSchema, { SchemaModelBase } from "../base/baseSchema";
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

messageSchema.pre<Message>('save', async function() {
    const path1 = 'user';
    const path2 = 'room';

    if(this.isModified(path1))
        this.set(path1, (await getValidReferences([this.get(path1) as string], UserSchema, 'user'))[0]);

    if(this.isModified(path2))
        this.set(path2, (await getValidReferences([this.get(path2) as string], RoomSchema, 'room'))[0]);
});

messageSchema.plugin(paginationPlugin);

export default Mongoose.model<Message, MessageModel>("Message", messageSchema);