const TYPES = {
    // Services
    IInvitationService: Symbol.for("IInvitationService"),
    IMessageService: Symbol.for("IMessageService"),
    IRoomService: Symbol.for("IRoomService"),
    IUserService: Symbol.for("IUserService"),

    // Repos
    IInvitationRepository: Symbol.for("IInvestigationRepository"),
    IMessageRepository: Symbol.for("IMessageRespository"),
    IRoomRepository: Symbol.for("IRoomRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    IFriendshipRepository: Symbol.for("IFriendshipRepository"),
};

export { TYPES };