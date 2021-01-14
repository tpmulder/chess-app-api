import { User } from "../../models/user/interface";
import { InvitationFor, InvitationStatus } from "../../common/enums";
import DtoBase from "../../models/base/dtoBase";

export interface InvitationDto extends DtoBase {
    sender?: User | string
    receiver?: User | string
    description: string
    for: InvitationFor
    status: InvitationStatus
    sentOn: Date
}