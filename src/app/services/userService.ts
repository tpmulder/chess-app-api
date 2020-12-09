import User from "../models/user/interface";
import FriendShipRepository from "../repositories/friendshipRepository";
import UserRepository from "../repositories/userRepository";
import PaginationParams from "../utils/pagination/paginationParams";
import PaginationResult from "../utils/pagination/paginationResult";
import ServiceBase from "./base/serviceBase";

export default class UserService extends ServiceBase<User> {
  private readonly userRepository: UserRepository;
  private readonly friendshipRepository: FriendShipRepository

  constructor() {
    const repo = new UserRepository();
    super(repo);

    this.userRepository = repo;
    this.friendshipRepository = new FriendShipRepository();
  }

  async getAll(params: PaginationParams): Promise<PaginationResult> {
    let users = await this.userRepository.getAll(params);

    if(params.options.includes?.includes('friends')) {
      users.items = users.items.map(async e => {
        e.friends = await this.friendshipRepository.getAllFriendsOfUser(e.username);
        return e;
      });
    }

    return users;
  }

  async getById(id: string, includes?: string, selects?: string) {
    let user = await this.userRepository.getById(id, includes, selects) as User;

    if(includes?.includes('friends')) {
      user.friends = await this.friendshipRepository.getAllFriendsOfUser(user.username);
    }

    return user;
  }

  async delete(id: string): Promise<User> {
    const mongoResult = await super.delete(id);
    
    await this.friendshipRepository.deleteUser(mongoResult.username);

    return mongoResult;
  }

  async create(item: Partial<User>): Promise<User> {
    const mongoResult = await super.create(item);

    await this.friendshipRepository.createUser(mongoResult.username);

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