import { Invitation } from "../models/invitation/interface";
import InvitationSchema, { InvitationModel } from "../models/invitation/schema";
import { MongoRepository, RepositoryBase } from "./base/mongoRepositoryBase";

interface IInvitationRepository extends MongoRepository<Invitation> {

}

class InvitationRepository extends RepositoryBase<Invitation> implements IInvitationRepository {
    private readonly invitationModel: InvitationModel
    
    constructor() {
        super(InvitationSchema);

        this.invitationModel = InvitationSchema;
    }
}

export { IInvitationRepository, InvitationRepository }