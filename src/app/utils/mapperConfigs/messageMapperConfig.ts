import { MessageDto } from "../../dtos/message/dto";
import { Message } from "../../models/message/interface";
import { Room } from "../../models/room/interface";
import { User } from "../../models/user/interface";
import { MapperConfigBase } from "./base/mapperConfigBase";
import roomMapperConfig from "./roomMapperConfig";
import userMapperConfig from "./userMapperConfig";

export class MessageMapperConfig extends MapperConfigBase<Message, MessageDto> {
    forward(src: Message): MessageDto {
        const dto: MessageDto = {
            id: src._id,
            text: src.text,
            sentOn: src.sentOn,
            updatedAt: src.updatedAt,
            sender: src.sender && typeof src.sender !== 'object'
                ? undefined
                : userMapperConfig.forward(src.sender as User),
            room: src.room && typeof src.room !== 'object'
                ? undefined
                : roomMapperConfig.forward(src.room as Room),
            receiver: typeof src.sender !== 'object'
                ? undefined
                : userMapperConfig.forward(src.sender),
        }

        return dto;
    }

    reverse(src: Partial<MessageDto>): Partial<Message> {
        const model: Partial<Message> = {
            _id: src.id,
            text: src.text,
            sentOn: src.sentOn,
            sender: src.sender ? (typeof src.sender !== 'string' 
                    ? undefined 
                    : src.sender) 
                : undefined,
            room: src.room ? (typeof src.room !== 'string' 
                    ? undefined 
                    : src.room) 
                : undefined
        }

        return model;
    }
}

export default new MessageMapperConfig();