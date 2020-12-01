import Mongoose from "mongoose";
import { challenge_status } from "../../common/enums";

export interface Challenge extends Mongoose.Document  {
    contestant: string,
    challenger: string,
    status: challenge_status,
    time: Date
}