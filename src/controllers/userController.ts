import express from "express";
import { User } from "../app/models/user/interface";
import ControllerBase from "./base/controllerBase";
import userMapperConfig, { UserMapperConfig } from "../app/utils/mapperConfigs/userMapperConfig";
import { createdResponse, noContentResponse } from "../app/common/responses";

import 'express-async-errors';
import { UserService } from "../app/services/userService";
import { UserDto } from "../app/dtos/user/dto";

class UserController extends ControllerBase<User, UserDto> {
  private readonly userService: UserService;
  private readonly userMapperConfig: UserMapperConfig;

  constructor() {
    const service = new UserService();
    super("users", service, userMapperConfig);

    this.userService = service;
    this.userMapperConfig = userMapperConfig;
  }

  protected routes() {
    this.router.post('/:userId/friends', async (req: express.Request, res: express.Response) => await this.createFriendship(req, res));
    this.router.delete('/friends', async (req: express.Request, res: express.Response) => await this.deleteFriendship(req, res));
  }

  async createFriendship(req: express.Request, res: express.Response) {
    const userId = `${req.params.userId}`;
    const friendId = `${req.body.friendId}`;

    createdResponse(res, await this.userService.createFriendship(userId, friendId));
  }

  async deleteFriendship(req: express.Request, res: express.Response) {
    const userId = `${req.params.userId}`;
    const friendId = `${req.body.friendId}`;

    await this.userService.deleteFriendship(userId, friendId);

    noContentResponse(res);
  }
}

export default UserController;