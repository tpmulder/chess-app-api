import { Container } from "inversify";
import { FriendshipRepository, IFriendshipRepository } from "../app/repositories/friendshipRepository";
import { IInvitationRepository, InvitationRepository } from "../app/repositories/invitationRepository";
import { MessageRepository, IMessageRepository } from "../app/repositories/messageRepository";
import { IRoomRepository, RoomRepository } from "../app/repositories/roomRepository";
import { IUserRepository, UserRepository } from "../app/repositories/userRepository";
import { IInvitationService, InvitationService } from "../app/services/invitationService";
import { IMessageService, MessageService } from "../app/services/messageService";
import { IRoomService, RoomService } from "../app/services/roomService";
import { IUserService, UserService } from "../app/services/userService";
import { TYPES } from "./types";

const container = new Container();

// Services
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IMessageService>(TYPES.IMessageService).to(MessageService);
container.bind<IRoomService>(TYPES.IRoomService).to(RoomService);
container.bind<IInvitationService>(TYPES.IInvitationService).to(InvitationService);

// Repos
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IFriendshipRepository>(TYPES.IFriendshipRepository).to(FriendshipRepository);
container.bind<IMessageRepository>(TYPES.IMessageRepository).to(MessageRepository);
container.bind<IInvitationRepository>(TYPES.IInvitationRepository).to(InvitationRepository);
container.bind<IRoomRepository>(TYPES.IRoomRepository).to(RoomRepository);

export { container };