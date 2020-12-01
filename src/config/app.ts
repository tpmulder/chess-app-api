import express from "express";
import http from "http";
import MongoConnection from "./mongoConnection";
import { environment } from "../app/common/enums";
import { configurePreRouteMiddlewares, configurePostRouteMiddlewares } from "./middlewareConfiguration";
import BaseController from "../controllers/baseController";
import UserController from "../controllers/userController";
import ControllerBase from "../controllers/base/controllerBase";
// import ioServer, { Socket } from "socket.io";
// import io from 'socket.io-client';

class App {
  public server: http.Server;
  // public socket: SocketIOClient.Socket;

  private app: express.Application;
  private environment: environment;

  private port: number | undefined;
  private mongodbConnectionString: string | undefined;

  constructor(env: environment) {
    this.environment = env;
    this.loadVariablesForEnvironment(this.environment);
    this.app = express();
    this.app.set("port", this.port);
    this.server = http.createServer(this.app);
    // this.socket = io(this.server);

    MongoConnection.connect(`${this.mongodbConnectionString}`);

    var controllers = [
      new BaseController(),
      new UserController()
    ];

    // this.socket.on('connection', (socket: Socket) => {
    //   console.log('a user connected');
    // });

    configurePreRouteMiddlewares(this.app);

    this.initControllers(controllers);
    
    configurePostRouteMiddlewares(this.app);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  private initControllers(controllers: ControllerBase[]): void {
    controllers.forEach((controller) => {
      this.app.use(`/api/v1/${controller.path}`, controller.router);
    });
  }

  private loadVariablesForEnvironment(env: environment) {
    let mongoConn = env === environment.local ? 
      `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}` : 
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
      `@projectscluster.mmrax.mongodb.net/${process.env.MONGO_DB_NAME + (env === environment.development ? "test" : "")}` +
      `?retryWrites=true&w=majority`;

    this.port = parseInt(`${process.env.PORT}`, 10);
    this.mongodbConnectionString = mongoConn;
  }
}

export default new App((<any>environment)[`${process.env.NODE_ENV}`.trim()]);