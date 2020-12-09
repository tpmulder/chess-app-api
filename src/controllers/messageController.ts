import ControllerBase from "./base/controllerBase";
import Message from "../app/models/message/interface";
import MessageDto from "../app/models/message/dto";
import MessageMapperConfig from "../app/utils/mapperConfigs/messageMapperConfig";
import MessageService from "../app/services/messageService";

import 'express-async-errors';

export default class MessageController extends ControllerBase<Message, MessageDto> {
    private readonly messageService: MessageService;
    private readonly messageMapperConfig: MessageMapperConfig;

    constructor() {
        const service = new MessageService();
        const config = new MessageMapperConfig();
        super("messages", service, config);

        this.messageService = service;
        this.messageMapperConfig = config;
    }

    protected routes() {

    }
}