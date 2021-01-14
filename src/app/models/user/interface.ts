import Mongoose from "mongoose";
import { UserProviders } from "../../common/constants";
import { Genders } from "../../common/enums";
import { Message } from "../message/interface";
import { Room } from "../room/interface";

export interface User extends Mongoose.Document {
  provider: UserProviders
  email: string
  username: string
  picture: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: Genders
  rating: number
  rooms: Room[]
  messages: Message[]
  friends: User[]
}