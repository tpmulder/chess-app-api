import UserSchema, { UserModel } from "../models/user/schema";
import { User } from "../models/user/interface";
import { MongoRepository, RepositoryBase } from "./base/mongoRepositoryBase";

interface IUserRepository extends MongoRepository<User> {
  
}

class UserRepository extends RepositoryBase<User> implements IUserRepository {
  private readonly userModel: UserModel

  constructor() {
    super(UserSchema);

    this.userModel = UserSchema;
  }
}

export { IUserRepository, UserRepository }