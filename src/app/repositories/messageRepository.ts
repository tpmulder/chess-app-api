import { injectable } from "inversify";
import { Message } from "../models/message/interface";
import MessageSchema, { MessageModel } from "../models/message/schema";
import { MongoRepository, RepositoryBase } from "./base/mongoRepositoryBase";
import "reflect-metadata";

interface IMessageRepository extends MongoRepository<Message> {
    
}

@injectable()
class MessageRepository extends RepositoryBase<Message> implements IMessageRepository {
    private readonly messageModel: MessageModel
    
    constructor() {
        super(MessageSchema);

        this.messageModel = MessageSchema;
    }
}

export { IMessageRepository, MessageRepository }