import Mongoose from "mongoose";
import { BaseSchema, SchemaModelBase } from "../base/baseSchema";
import { Message } from "../message/interface";
import { Room } from "./interface";

import UserSchema from '../user/schema';
import { getValidReferences } from "../../utils/helpers/getValidReferences";

export interface RoomModel extends SchemaModelBase<Room> {
    messages: Message[]
}

const roomSchema = new BaseSchema({
    name: {
        type: String, maxlength: 20
    },
    isPublic: {
        type: Boolean, default: false
    },
    users: [{
        ref: 'User', type: Mongoose.Schema.Types.ObjectId
    }]
}, { toJSON: { virtuals: true } });

roomSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'room',
});

roomSchema.pre<Room>('save', async function() {
    const path = 'users';

    if(this.isModified(path))
        this.set(path, await getValidReferences(this.get(path) as string[], UserSchema, 'user'));
})

export default Mongoose.model<Room, RoomModel>("Room", roomSchema);