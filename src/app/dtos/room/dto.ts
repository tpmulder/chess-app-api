import DtoBase from "../base/dtoBase"
import { Message } from "../../models/message/interface"
import { User } from "../../models/user/interface"
import { MessageDto } from "../message/dto"
import { UserDto } from "../user/dto"

export default interface RoomDto extends DtoBase {
    name: string
    description: string
    isPublic: boolean
    messages?: MessageDto[]
    users?: UserDto[] | string[]
}