import express, { Router } from 'express';
export default abstract class ControllerBase {
    router: Router

    constructor(public readonly path: string, public readonly isAuthenticated: boolean) {
        this.router = express.Router();

        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;
}