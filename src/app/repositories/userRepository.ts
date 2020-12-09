import UserSchema, { UserModel } from "../models/user/schema";
import User from "../models/user/interface";
import { RepositoryBase } from "./base/mongoRepositoryBase";

export default class UserRepository extends RepositoryBase<User> {
  private readonly userModel: UserModel

  constructor() {
    super(UserSchema);

    this.userModel = UserSchema;
  }
}