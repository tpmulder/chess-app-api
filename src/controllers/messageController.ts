import ControllerBase from "./base/controllerBase";
import { Message } from "../app/models/message/interface";
import messageMapperConfig, { MessageMapperConfig } from "../app/utils/mapperConfigs/messageMapperConfig";

import 'express-async-errors';
import { MessageService } from "../app/services/messageService";
import { MessageDto } from "../app/dtos/message/dto";

export default class MessageController extends ControllerBase<Message, MessageDto> {
    private readonly messageService: MessageService;
    private readonly messageMapperConfig: MessageMapperConfig;

    constructor() {
        const service = new MessageService();
        super("messages", service, messageMapperConfig);

        this.messageService = service;
        this.messageMapperConfig = messageMapperConfig;
    }

    protected routes() {

    }
}