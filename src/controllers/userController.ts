import express from "express";
import { User } from "../app/models/user/interface";
import ControllerBase from "./base/controllerBase";
import { UserDto } from "../app/dtos/user/dto";
import UserMapperConfig from "../app/utils/mapperConfigs/userMapperConfig";
import { createdResponse, noContentResponse } from "../app/common/responses";

import 'express-async-errors';
import { IUserService } from "../app/services/userService";
import { inject } from "inversify";
import { TYPES } from "../config/types";
import { MapperConfig, MapperConfigBase } from "../app/utils/mapperConfigs/base/mapperConfigBase";

class UserController extends ControllerBase<User, UserDto> {
  private readonly userService: IUserService;
  private readonly mapping: UserMapperConfig;

  constructor(userService: IUserService, mapping: UserMapperConfig) {
    super("user", userService, mapping)

    this.userService = userService;
    this.mapping = mapping
  }

  protected routes() {
    this.router.post('/friends', async (req: express.Request, res: express.Response) => await this.createFriendship(req, res));
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