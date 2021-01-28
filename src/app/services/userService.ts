import e from "express";
import { User } from "../models/user/interface";
import { FriendshipRepository, IFriendshipRepository } from "../repositories/friendshipRepository";
import { IRoomRepository, RoomRepository } from "../repositories/roomRepository";
import { IUserRepository, UserRepository } from "../repositories/userRepository";
import PaginationParams from "../utils/pagination/paginationParams";
import PaginationResult from "../utils/pagination/paginationResult";
import { ApiService, ServiceBase } from "./base/serviceBase";

interface IUserService extends ApiService<User> {
  createFriendship(userId: string, friendId: string): Promise<{ message: string }>
  deleteFriendship(userId: string, friendId: string): Promise<{ message: string }>
}

class UserService extends ServiceBase<User> implements IUserService {
  private readonly userRepository: IUserRepository;
  private readonly roomRepository: IRoomRepository;
  private readonly friendshipRepository: IFriendshipRepository

  constructor()
  {
    const repo = new UserRepository();
    const friendRepo = new FriendshipRepository();
    const roomRepo = new RoomRepository();
    super(repo);

    this.userRepository = repo;
    this.friendshipRepository = friendRepo;
    this.roomRepository = roomRepo;
  }

  async getAll(params: PaginationParams): Promise<PaginationResult> {
    let users = await this.userRepository.getPaged(params);

    if(params.options.includes?.includes('friends')) {
      params.options.includes = params.options.includes?.replace('friends', '');
      users.items = users.items.map(async e => {
        e.friends = await this.friendshipRepository.getAllFriendsOfUser(e.username);
        return e;
      });
    }

    return users;
  }

  async getById(id: string, includes?: string, selects?: string) {
    let user = await this.userRepository.getById(id, includes, selects);

    if(includes?.includes('friends,friends.rooms')) {
      const friends = await this.friendshipRepository.getAllFriendsOfUser(user._id);

      const userFriends = await this.userRepository.getRangeById(friends.map(e => e.user_id), "rooms");

      user.friends = userFriends
    }

    return user;
  }

  async delete(id: string): Promise<User> {
    const mongoResult = await super.delete(id);
    
    await this.friendshipRepository.deleteUser(mongoResult._id);

    return mongoResult;
  }

  async create(item: Partial<User>): Promise<User> {
      const mongoResult = await super.create(item);

      await this.friendshipRepository.createUser(mongoResult._id, mongoResult.username);
  
      return mongoResult;
  }

  async createFriendship(userId: string, friendId: string) {
    await this.userRepository.getById(userId)
    await this.userRepository.getById(friendId)

    return await this.friendshipRepository.createFriendship(userId, friendId);
  }

  async deleteFriendship(userId: string, friendId: string) {
    await this.userRepository.getById(userId)
    await this.userRepository.getById(friendId)

    return await this.friendshipRepository.deleteFriendship(userId, friendId);
  }
}

export { IUserService, UserService }