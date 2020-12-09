import Message from "../models/message/interface";
import MessageSchema, { MessageModel } from "../models/message/schema";
import { RepositoryBase } from "./base/mongoRepositoryBase";

export default class MessageRepository extends RepositoryBase<Message> {
    private readonly messageModel: MessageModel
    
    constructor() {
        super(MessageSchema);

        this.messageModel = MessageSchema;
    }
}