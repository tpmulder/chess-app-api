import Mongoose from "mongoose";
import { genders } from "../../common/enums";
import { Game } from "../game/interface";

export interface User extends Mongoose.Document {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  gender: genders,
  games: Game[]
}