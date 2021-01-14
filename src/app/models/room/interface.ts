import mongoose from "mongoose";
import { Message } from "../message/interface";
import { User } from "../user/interface";

export interface Room extends mongoose.Document {
    name: string
    description: string
    isPublic: boolean
    messages: Message[]
    users: User[] | string[]
}