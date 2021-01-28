import { Message } from "../models/message/interface";
import { IMessageRepository, MessageRepository } from "../repositories/messageRepository";
import { ApiService, ServiceBase } from "./base/serviceBase";

interface IMessageService extends ApiService<Message> {

}

class MessageService extends ServiceBase<Message> implements IMessageService {
    private readonly messageRepository: IMessageRepository

    constructor() {
        const repo = new MessageRepository();
        super(repo);

        this.messageRepository = repo;
    }
}

export { IMessageService, MessageService }