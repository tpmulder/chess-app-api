import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../config/types";
import { Message } from "../models/message/interface";
import { IMessageRepository } from "../repositories/messageRepository";
import { ApiService, ServiceBase } from "./base/serviceBase";

interface IMessageService extends ApiService<Message> {

}

@injectable()
class MessageService extends ServiceBase<Message> implements IMessageService {
    private readonly messageRepository: IMessageRepository

    constructor(
        @inject(TYPES.IMessageRepository) messageRepo: IMessageRepository
    ) {
        super(messageRepo);

        this.messageRepository = messageRepo;
    }
}

export { IMessageService, MessageService }