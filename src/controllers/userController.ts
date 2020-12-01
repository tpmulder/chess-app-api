import ApiController from "./base/apiController";
import express from "express";
import { User } from "../app/models/user/interface";
import UserService from "../app/services/userService";
import ControllerBase from "./base/controllerBase";
import { okResponse } from "../app/common/responses";
import 'express-async-errors';

class UserController extends ControllerBase implements ApiController {
  private readonly _service: UserService;

  constructor() {
    super("users", true);

    this._service = new UserService();
  }

  protected initializeRoutes(): void {
    this.router.get('/', async (req: express.Request, res: express.Response) => await this.getAll(req, res));
    this.router.post('/', async (req: express.Request, res: express.Response) => await this.create(req, res));
    this.router.get('/:id', async (req: express.Request, res: express.Response) => await this.getById(req, res));
    this.router.put('/:id', async (req: express.Request, res: express.Response) => await this.update(req, res));
    this.router.delete('/:id', async (req: express.Request, res: express.Response) => await this.delete(req, res));
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    let result = await this._service.create(req.body);

    okResponse(res, result);
  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      let user: User = <User>req.body;
      let id: string = req.params.id;

      let result = await this._service.update(id, user);

      res.send(result);
    } 
    catch (err) {

    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      let id: string = req.params.id;

      let result = await this._service.delete(id);

      res.send(result);
    } 
    catch (err) {
      console.log(err);
      
      res.send(err);
    }
  }

  async getAll(req: express.Request, res: express.Response): Promise<void> {
    console.log(req.query);

    let result = await this._service.getAll();

    res.send(result);
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    try {
      let id: string = req.params.id;

      let result = await this._service.getById(id);

      res.send(result);
    } 
    catch (err) {
      console.log(err);
      
      res.send(err);
    }
  }
}

export default UserController;