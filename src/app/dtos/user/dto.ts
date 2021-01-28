import { UserProviders } from "../../common/constants"
import { Genders } from "../../common/enums"
import DtoBase from "../base/dtoBase"
import { MessageDto } from "../message/dto"
import RoomDto from "../room/dto"

export interface UserDto extends DtoBase {
    provider: UserProviders
    email: string
    username: string
    picture: string
    firstName: string
    phoneNumber: string
    lastName: string
    gender: Genders
    rooms?: RoomDto[]
    messages?: MessageDto[]
    friends?: UserDto[]
}