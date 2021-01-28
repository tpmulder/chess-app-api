import { UserDto } from "../../dtos/user/dto";
import { User } from "../../models/user/interface";
import { MapperConfigBase } from "./base/mapperConfigBase";
import messageMapperConfig from "./messageMapperConfig";
import roomMapperConfig from "./roomMapperConfig";

export class UserMapperConfig extends MapperConfigBase<User, UserDto> {
    forward(src: User): UserDto {
        const dto: UserDto = {
            id: src._id,
            provider: src.provider,
            email: src.email,
            username: src.username,
            picture: src.picture,
            firstName: src.firstName,
            lastName: src.lastName,
            phoneNumber: src.phoneNumber,
            gender: src.gender,
            messages: src.messages ? src.messages.map(e => messageMapperConfig.forward(e)) : undefined,
            rooms: src.rooms ? src.rooms.map(e => roomMapperConfig.forward(e)) : undefined,
            friends: src.friends ? src.friends.map(e => this.forward(e)) : undefined
        }

        return dto;
    }
    reverse(src: Partial<UserDto>): Partial<User> {
        const model: Partial<User> = { 
            _id: src.id,
            provider: src.provider,
            email: src.email,
            username: src.username,
            picture: src.picture,
            firstName: src.firstName,
            lastName: src.lastName,
            phoneNumber: src.phoneNumber,
            gender: src.gender
         };

        return model;
    }
}

export default new UserMapperConfig();