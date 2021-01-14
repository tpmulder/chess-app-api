import ControllerBase from "./base/controllerBase";
import { Message } from "../app/models/message/interface";
import { MessageDto } from "../app/dtos/message/dto";
import MessageMapperConfig from "../app/utils/mapperConfigs/messageMapperConfig";
import { IMessageService } from "../app/services/messageService";

import 'express-async-errors';

export default class MessageController extends ControllerBase<Message, MessageDto> {
    private readonly messageService: IMessageService;
    private readonly messageMapperConfig: MessageMapperConfig;

    constructor(msgService: IMessageService, mapping: MessageMapperConfig) {
        super("messages", msgService, mapping);

        this.messageService = msgService;
        this.messageMapperConfig = mapping;
    }

    protected routes() {

    }
}