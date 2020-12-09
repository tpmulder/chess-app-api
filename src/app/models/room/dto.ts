import DtoBase from "../base/dtoBase"
import Message from "../message/interface"
import User from "../user/interface"

export default interface RoomDto extends DtoBase {
    name: string
    isPublic: boolean
    messages: Message[]
    users: User[] | string[]
}