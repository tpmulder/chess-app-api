import UserSchema, { UserModel } from "../models/user/schema";
import { User } from "../models/user/interface";
import { RepositoryBase } from "./base/repositoryBase";
import { Model } from "mongoose";

export default class UserRepository extends RepositoryBase<User> {
  private readonly _userModel: Model<User & UserModel>;

  constructor() {
    super(UserSchema);

    this._userModel = UserSchema;
  }

  // async findByNameAndPass(username: string, password: string): Promise<User> {
  //   let result = await this._userModel.findOne({ username: username }).exec();

  //   if(!result || !await result.isValidPassword(password)) {
  //     throw new ApiError(http_status_codes.unauthorized, "Wrong username and/or password.");
  //   }

  //   return result;
  // }
}