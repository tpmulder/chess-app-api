import { User } from "../models/user/interface";
import UserRepository from "../repositories/userRepository";
import ServiceBase from "./base/serviceBase";

export default class UserService extends ServiceBase<User> {
  private readonly _userRepository: UserRepository;

  constructor() {
    super(new UserRepository());

    this._userRepository = new UserRepository();
  }

  // async findByNameAndPass(username: string, password: string): Promise<User> {
  //   return await this._userRepository.findByNameAndPass(username, password);
  // }
}