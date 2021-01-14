import { MessageDto } from "../../dtos/message/dto";
import { Message } from "../../models/message/interface";
import MapperConfigBase from "./base/mapperConfigBase";

class MessageMapperConfig extends MapperConfigBase<Message, MessageDto> {
    forward(src: Message): MessageDto {
        const dto: MessageDto = {
            id: src._id,
            text: src.text,
            sentOn: src.sentOn,
            updatedAt: src.updatedAt,
            sender: src.sender,
            room: src.room
        }

        return dto;
    }

    reverse(src: Partial<MessageDto>): Partial<Message> {
        const model: Partial<Message> = {
            _id: src.id,
            text: src.text,
            sentOn: src.sentOn,
            updatedAt: src.updatedAt,
            sender: src.sender ? (typeof src.sender !== 'string' 
                    ? undefined 
                    : src.sender as string) 
                : undefined,
            room: src.room ? (typeof src.room !== 'string' 
                    ? undefined 
                    : src.room as string) 
                : undefined
        }

        return model;
    }
}

export default MessageMapperConfig;