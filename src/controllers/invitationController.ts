import ControllerBase from "./base/controllerBase";
import 'express-async-errors';
import { Invitation } from "../app/models/invitation/interface";
import { InvitationDto } from "../app/dtos/invitation/dto";
import { InvitationService } from "../app/services/invitationService";
import invitationMapperConfig, { InvitationMapperConfig } from "../app/utils/mapperConfigs/invitationMapperConfig";

export default class InvitationController extends ControllerBase<Invitation, InvitationDto> {
    private readonly invitationService: InvitationService;
    private readonly invitationMapperConfig: InvitationMapperConfig;

    constructor() {
        const service = new InvitationService();
        super("invitations", service, invitationMapperConfig);

        this.invitationService = service;
        this.invitationMapperConfig = invitationMapperConfig;
    }

    protected routes() {

    }
}