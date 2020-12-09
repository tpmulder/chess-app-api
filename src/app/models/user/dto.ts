import { genders } from "../../common/enums"
import DtoBase from "../base/dtoBase"
import Message from "../message/interface"
import { Room } from "../room/interface"

export default interface UserDto extends DtoBase {
    email: string
    username: string
    picture: string
    firstName: string
    lastName: string
    phoneNumber: string
    gender: genders
    rating: number
    rooms: Room[]
    messages: Message[]
}