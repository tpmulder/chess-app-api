import express from "express";
import { createServer, Server as httpServer } from "http";
import MongoConnection from "./mongoConnection";
import { environment } from "../app/common/enums";
import { configurePreRouteMiddlewares, configurePostRouteMiddlewares } from "./middlewareConfiguration";
import UserController from "../controllers/userController";
import { ApiController } from "../controllers/base/controllerBase";
import { Server, Socket } from "socket.io";
import RoomController from "../controllers/roomController";
import neo4j, { Driver } from 'neo4j-driver';
import MessageController from "../controllers/messageController";

class App {
  private app: express.Application
  private environment: environment
  private port: number | undefined
  private mongodbConnectionString: string | undefined
  private neo4jConnectionString: string | undefined
  private server: httpServer

  public ioServer: Server
  public neo4jDriver: Driver

  constructor(env: environment) {
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
      new MessageController()
    ];

    configurePreRouteMiddlewares(this.app);

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

  private loadVariablesForEnvironment(env: environment) {
    const neo4jConn = env === environment.local ? 'bolt://localhost:7687' : 'bolt://localhost:7687';

    const mongoConn = env === environment.local ? 
      `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}` : 
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
      `@projectscluster.mmrax.mongodb.net/${process.env.MONGO_DB_NAME + (env === environment.development ? "Test" : "")}` +
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

export default new App((<any>environment)[`${process.env.NODE_ENV}`.trim()]);

// this.ioServer.on('connection', (socket: Socket) => {
//   console.log('a user connected');
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = (socket: Socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };