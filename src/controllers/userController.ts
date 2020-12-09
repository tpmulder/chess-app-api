import express from "express";
import User from "../app/models/user/interface";
import UserService from "../app/services/userService";
import ControllerBase from "./base/controllerBase";
import UserDto from "../app/models/user/dto";
import UserMapperConfig from "../app/utils/mapperConfigs/userMapperConfig";

import 'express-async-errors';
import { noContentResponse, okResponse } from "../app/common/responses";

class UserController extends ControllerBase<User, UserDto> {
  private readonly userService: UserService;
  private readonly userMapperConfig: UserMapperConfig;

  constructor() {
    const service = new UserService();
    const config = new UserMapperConfig()
    super("users", service, config);

    this.userService = service;
    this.userMapperConfig = config;
  }

  protected routes() {
    this.router.post('/:userId/friends/:friendId', async (req: express.Request, res: express.Response) => await this.createFriendship(req, res));
    this.router.delete('/:userId/friends/:friendId', async (req: express.Request, res: express.Response) => await this.deleteFriendship(req, res));
  }

  async createFriendship(req: express.Request, res: express.Response) {
    const userId = `${req.params.userId}`;
    const friendId = `${req.params.friendId}`;

    okResponse(res, await this.userService.createFriendship(userId, friendId));
  }

  async deleteFriendship(req: express.Request, res: express.Response) {
    const userId = `${req.params.userId}`;
    const friendId = `${req.params.friendId}`;

    await this.userService.deleteFriendship(userId, friendId);

    noContentResponse(res);
  }
}

export default UserController;