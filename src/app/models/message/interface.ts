import Mongoose from "mongoose";
import { Room } from "../room/interface";
import User from "../user/interface";

export default interface Message extends Mongoose.Document {
    text: string
    sentOn: Date
    updatedAt?: Date
    room: string | Room
    sender: string | User
}