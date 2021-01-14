import { UserDto } from "../../dtos/user/dto";
import { User } from "../../models/user/interface";
import MapperConfigBase from "./base/mapperConfigBase";

class UserMapperConfig extends MapperConfigBase<User, UserDto> {
    forward(src: User): UserDto {
        const dto: UserDto = {
            provider: src.provider,
            id: src._id,
            email: src.email,
            username: src.username,
            picture: src.picture,
            firstName: src.firstName,
            lastName: src.lastName,
            phoneNumber: src.phoneNumber,
            gender: src.gender,
            rating: src.rating,
            messages: src.messages,
            rooms: src.rooms,
            friends: src.friends
        }

        return dto;
    }
    reverse(src: Partial<UserDto>): Partial<User> {
        const model: Partial<User> = { 
            _id: src.id,
            email: src.email,
            username: src.username,
            picture: src.picture,
            firstName: src.firstName,
            lastName: src.lastName,
            phoneNumber: src.phoneNumber,
            gender: src.gender,
            rating: src.rating
         };

        return model;
    }
}

export default UserMapperConfig;