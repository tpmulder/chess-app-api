import Mongoose from "mongoose";
import { InvitationFor, InvitationStatus } from "../../common/enums";
import { BaseSchema, SchemaModelBase } from "../base/baseSchema";
import { Invitation } from "./interface";

export interface InvitationModel extends SchemaModelBase<Invitation> {
  
}

const invitationSchema = new BaseSchema({
    sender: {
        ref: 'User', type: Mongoose.Schema.Types.ObjectId, required: true
    },
    receiver: {
        ref: 'User', type: Mongoose.Schema.Types.ObjectId, required: true
    },
    description: {
        type: String
    },
    for: {
        type: String, enum: Object.values(InvitationFor), default: InvitationFor.Friendship
    },
    status: {
        type: String, enum: Object.values(InvitationStatus), default: InvitationStatus.Pending
    },
    sentOn: {
        type: Date, default: Date.now()
    }
})

export default Mongoose.model<Invitation, InvitationModel>("Invitation", invitationSchema);