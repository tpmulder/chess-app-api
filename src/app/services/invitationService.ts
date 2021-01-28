import { Invitation } from "../models/invitation/interface";
import { IInvitationRepository, InvitationRepository } from "../repositories/invitationRepository";
import { ApiService, ServiceBase } from "./base/serviceBase";

interface IInvitationService extends ApiService<Invitation> {

}

class InvitationService extends ServiceBase<Invitation> implements IInvitationService {
    private readonly invitationRepository: IInvitationRepository

    constructor() {
        const invRepo = new InvitationRepository();
        super(invRepo);

        this.invitationRepository = invRepo;
    }
}

export { IInvitationService, InvitationService }