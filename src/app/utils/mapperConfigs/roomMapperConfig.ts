import RoomDto from "../../dtos/room/dto";
import { Room } from "../../models/room/interface";
import { User } from "../../models/user/interface";
import MapperConfigBase from "./base/mapperConfigBase";

class RoomMapperConfig extends MapperConfigBase<Room, RoomDto> {
    forward(src: Room): RoomDto {
        const dto: RoomDto = {
            id: src._id,
            name: src.name,
            description: src.description,
            isPublic: src.isPublic,
            messages: src.messages,
            users: src.users.length > 0 
                ? (typeof src.users[0] === 'string' 
                    ? new Array<User>() 
                    : src.users as User[]) 
                : new Array<User>(),
        }

        return dto;
    }

    reverse(src: Partial<RoomDto>): Partial<Room> {
        const model: Partial<Room> = {
            _id: src.id,
            name: src.name,
            description: src.description,
            isPublic: src.isPublic,
            users: src.users ? (src.users.length > 0 
                ? (typeof src.users[0] !== 'string' 
                    ? undefined 
                    : src.users as string[]) 
                : new Array<User>()) 
            : undefined,
        }

        return model;
    }
}

export default RoomMapperConfig;