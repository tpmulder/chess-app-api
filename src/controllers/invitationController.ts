import ControllerBase from "./base/controllerBase";
import 'express-async-errors';
import { Invitation } from "../app/models/invitation/interface";
import { InvitationDto } from "../app/dtos/invitation/dto";
import { IInvitationService } from "../app/services/invitationService";
import InvitationMapperConfig from "../app/utils/mapperConfigs/invitationMapperConfig";
import { MapperConfig } from "../app/utils/mapperConfigs/base/mapperConfigBase";

export default class MessageController extends ControllerBase<Invitation, InvitationDto> {
    private readonly invitationService: IInvitationService;
    private readonly invitationMapperConfig: InvitationMapperConfig;

    constructor(invService: IInvitationService, mapping: InvitationMapperConfig) {
        super("messages", invService, mapping);

        this.invitationService = invService;
        this.invitationMapperConfig = mapping;
    }

    protected routes() {

    }
}