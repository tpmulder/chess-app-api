import UserSchema, { UserModel } from "../models/user/schema";
import { User } from "../models/user/interface";
import { MongoRepository, RepositoryBase } from "./base/mongoRepositoryBase";
import { injectable } from "inversify";
import "reflect-metadata";

interface IUserRepository extends MongoRepository<User> {
  
}

@injectable()
class UserRepository extends RepositoryBase<User> implements IUserRepository {
  private readonly userModel: UserModel

  constructor() {
    super(UserSchema);

    this.userModel = UserSchema;
  }
}

export { IUserRepository, UserRepository }