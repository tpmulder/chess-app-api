import { InvitationDto } from "../../dtos/invitation/dto";
import { Invitation } from "../../models/invitation/interface";
import { MapperConfigBase } from "./base/mapperConfigBase";

class InvitationMapperConfig extends MapperConfigBase<Invitation, InvitationDto> {
    forward(src: Invitation) {
        const dto: InvitationDto = {
            id: src._id,
            description: src.description,
            for: src.for,
            sentOn: src.sentOn,
            sender: src.sender,
            status: src.status,
            receiver: src.receiver
        }

        return dto;
    }

    reverse(src: Partial<InvitationDto>) {
        const model: Partial<Invitation> = {
            id: src.id,
            description: src.description,
            for: src.for,
            sentOn: src.sentOn,
            status: src.status,
            sender: src.sender ? (typeof src.sender !== 'string' 
                    ? undefined 
                    : src.sender as string) 
                : undefined,
            receiver: src.sender ? (typeof src.sender !== 'string' 
                    ? undefined 
                    : src.sender as string) 
                : undefined,
        }

        return model;
    }
}

export default InvitationMapperConfig;