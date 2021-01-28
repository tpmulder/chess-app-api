import { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "../app/middleware/errorHandler";
import { requestLogger } from "../app/middleware/requestLogger";

const configurePostRouteMiddlewares = (app: Application) => {
    app.use(errorHandler);
}

const configureMiddlewares = (app: Application) => {
    app.use(requestLogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(cors());
    app.use(helmet());
}

export { configurePostRouteMiddlewares, configureMiddlewares }