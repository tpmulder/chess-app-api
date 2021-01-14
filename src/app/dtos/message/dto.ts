import DtoBase from "../../models/base/dtoBase";
import { Room } from "../../models/room/interface";
import { User } from "../../models/user/interface";

export interface MessageDto extends DtoBase {
    text: string
    sentOn: Date
    updatedAt?: Date
    room?: Room | string
    sender?: User | string
    receiver?: User | string
}