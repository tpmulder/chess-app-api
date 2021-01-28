import DtoBase from "../base/dtoBase";
import { Room } from "../../models/room/interface";
import { User } from "../../models/user/interface";
import RoomDto from "../room/dto";
import { UserDto } from "../user/dto";

export interface MessageDto extends DtoBase {
    text: string
    sentOn: Date
    updatedAt?: Date
    room?: RoomDto | string
    sender?: UserDto | string
    receiver?: UserDto | string
}