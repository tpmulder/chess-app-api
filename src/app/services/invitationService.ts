import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../config/types";
import { Invitation } from "../models/invitation/interface";
import { IInvitationRepository } from "../repositories/invitationRepository";
import { ApiService, ServiceBase } from "./base/serviceBase";

interface IInvitationService extends ApiService<Invitation> {

}

@injectable()
class InvitationService extends ServiceBase<Invitation> implements IInvitationService {
    private readonly invitationRepository: IInvitationRepository

    constructor(
        @inject(TYPES.IInvitationRepository) invRepo: IInvitationRepository
    ) {
        super(invRepo);

        this.invitationRepository = invRepo;
    }
}

export { IInvitationService, InvitationService }