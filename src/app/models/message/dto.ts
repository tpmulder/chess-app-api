import DtoBase from "../base/dtoBase";
import { Room } from "../room/interface";
import User from "../user/interface";

export default interface MessageDto extends DtoBase {
    text: string
    sentOn: Date
    updatedAt?: Date
    room: string | Room
    sender: string | User
}