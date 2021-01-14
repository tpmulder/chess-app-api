import { UserProviders } from "../../common/constants"
import { Genders } from "../../common/enums"
import DtoBase from "../../models/base/dtoBase"
import { Message } from "../../models/message/interface"
import { Room } from "../../models/room/interface"
import { User } from "../../models/user/interface"

export interface UserDto extends DtoBase {
    provider: UserProviders
    email: string
    username: string
    picture: string
    firstName: string
    phoneNumber: string
    lastName: string
    gender: Genders
    rating: number
    rooms?: Room[]
    messages?: Message[]
    friends?: User[]
}