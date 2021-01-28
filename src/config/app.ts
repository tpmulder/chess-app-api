import express from "express";
import { createServer, Server as httpServer } from "http";
import { Environment } from "../app/common/constants";
import { configureMiddlewares, configurePostRouteMiddlewares } from "./middlewareConfiguration";
import UserController from "../controllers/userController";
import { ApiController } from "../controllers/base/controllerBase";
import { Server } from "socket.io";
import RoomController from "../controllers/roomController";
import neo4j, { Driver } from 'neo4j-driver';
import MessageController from "../controllers/messageController";
import { MongoConnection } from "./mongoConnection";
import InvitationController from "../controllers/invitationController";

class App {
  private environment: Environment
  private port: number | undefined
  private mongodbConnectionString: string | undefined
  private neo4jConnectionString: string | undefined
  private server: httpServer

  public app: express.Application
  public ioServer: Server
  public neo4jDriver: Driver

  constructor(env: Environment) {
    this.environment = env;
    this.loadVariablesForEnvironment(this.environment);

    this.app = express();
    this.app.set("port", this.port);
    
    this.server = createServer(this.app);
    this.ioServer = new Server(this.server);

    this.neo4jDriver = neo4j.driver(
      `${this.neo4jConnectionString}`, 
      neo4j.auth.basic(`${process.env.NEO4J_USERNAME}`, 
      `${process.env.NEO4J_PASSWORD}`)
    );

    MongoConnection.connect(`${this.mongodbConnectionString}`);

    var controllers = [
      new RoomController(),
      new UserController(),
      new MessageController(),
      new InvitationController()
    ];

    configureMiddlewares(this.app);

    this.initControllers(controllers);
    
    configurePostRouteMiddlewares(this.app);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  private initControllers(controllers: ApiController[]): void {
    controllers.forEach((controller) => {
      this.app.use(`/api/v1/${controller.path}`, controller.router);
    });
  }

  private loadVariablesForEnvironment(env: Environment) {
    const neo4jConn = env === Environment.local ? 'bolt://localhost:7687' : 'bolt://localhost:7687';

    const mongoConn = env === Environment.local ? 
      `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}` : 
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
      `@projectscluster.mmrax.mongodb.net/${process.env.MONGO_DB_NAME + (env === Environment.dev ? "Test" : "")}` +
      `?retryWrites=true&w=majority`;

    this.port = parseInt(`${process.env.PORT}`, 10);
    this.mongodbConnectionString = mongoConn;
    this.neo4jConnectionString = neo4jConn;
  }
}

export const neoDriver = neo4j.driver(
  `${'bolt://localhost:7687'}`, 
  neo4j.auth.basic(`${process.env.NEO4J_USERNAME}`, 
  `${process.env.NEO4J_PASSWORD}`))

export default new App((<any>Environment)[`${process.env.NODE_ENV}`.trim()]);