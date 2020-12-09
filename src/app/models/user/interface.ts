import Mongoose from "mongoose";
import { genders } from "../../common/enums";
import Message from "../message/interface";
import { Room } from "../room/interface";

export default interface User extends Mongoose.Document {
  email: string
  username: string
  picture: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: genders
  rating: number
  rooms: Room[]
  messages: Message[]
  friends: string[]
}