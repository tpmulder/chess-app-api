import ControllerBase from "./base/controllerBase";
import express from "express";

export default class BaseController extends ControllerBase {
    constructor() {
        super("", false);
    }

    protected initializeRoutes(): void {
        this.router.get('/', (req: express.Request, res: express.Response) => this.landing(req, res));
    }
    
    landing = (req: express.Request, res: express.Response) => {
        res.send("Hello world");
    }
}