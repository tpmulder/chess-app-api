import DtoBase from "../../models/base/dtoBase"
import { Message } from "../../models/message/interface"
import { User } from "../../models/user/interface"

export default interface RoomDto extends DtoBase {
    name: string
    description: string
    isPublic: boolean
    messages?: Message[]
    users?: User[] | string[]
}