import Mongoose from "mongoose";
import { InvitationFor, InvitationStatus } from "../../common/enums";
import { User } from "../user/interface";

export interface Invitation extends Mongoose.Document  {
    sender: User | string
    receiver: User | string
    description: string
    for: InvitationFor
    status: InvitationStatus
    sentOn: Date
}