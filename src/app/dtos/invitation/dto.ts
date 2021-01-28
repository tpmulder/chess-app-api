import { InvitationFor, InvitationStatus } from "../../common/enums";
import DtoBase from "../base/dtoBase";
import { UserDto } from "../user/dto";

export interface InvitationDto extends DtoBase {
    sender?: UserDto | string
    receiver?: UserDto | string
    description: string
    for: InvitationFor
    status: InvitationStatus
    sentOn: Date
}