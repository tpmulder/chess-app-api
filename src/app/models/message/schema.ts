import mongoose from "mongoose";
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
        ref: 'Room', type: mongoose.Schema.Types.ObjectId, required: true
    },
    sender: {
        ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true
    },
    receiver: {
        ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true
    }
});
messageSchema.pre<Message>('findOneAndUpdate', function(next) {
    this.set('updatedAt', new Date());

    next();
});

messageSchema.pre<Message>('save', async function() {
    const receiverPath = 'receiver';
    const senderPath = 'sender';
    const roomPath = 'room';

    if(this.isModified(receiverPath))
        this.set(receiverPath, (await getValidReferences([this.get(receiverPath) as string], UserSchema, receiverPath))[0]);

    if(this.isModified(senderPath))
        this.set(senderPath, (await getValidReferences([this.get(senderPath) as string], UserSchema, senderPath))[0]);

    if(this.isModified(roomPath))
        this.set(roomPath, (await getValidReferences([this.get(roomPath) as string], RoomSchema, roomPath))[0]);
});

messageSchema.plugin(paginationPlugin);

export default mongoose.model<Message, MessageModel>("Message", messageSchema);