import Mongoose from "mongoose";
import { Room } from "../room/interface";
import { User } from "../user/interface";

export interface Message extends Mongoose.Document {
    text: string
    sentOn: Date
    updatedAt?: Date
    room: string | Room
    sender: string | User
    receiver: string | User
}