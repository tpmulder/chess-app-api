import Message from "../models/message/interface";
import MessageRepository from "../repositories/messageRepository";
import RoomRepository from "../repositories/roomRepository";
import UserRepository from "../repositories/userRepository";
import ServiceBase from "./base/serviceBase";

export default class MessageService extends ServiceBase<Message> {
    private readonly messageRepository: MessageRepository

    constructor() {
        const repo = new MessageRepository();
        super(repo);

        this.messageRepository = repo;
    }
}