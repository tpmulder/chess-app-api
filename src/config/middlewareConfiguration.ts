import { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "../app/middlewares/errorHandler";
import { requestLogger } from "../app/middlewares/requestLogger";

export const configurePostRouteMiddlewares = (app: Application) => {
    app.use(errorHandler);
}

export const configurePreRouteMiddlewares = (app: Application) => {
    app.use(requestLogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(cors());
    app.use(helmet());
}