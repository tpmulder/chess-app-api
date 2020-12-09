import express, { Router } from 'express';
import { ApiService } from '../../app/services/base/serviceBase';
import { noContentResponse, okResponse } from '../../app/common/responses';
import { ApiError } from '../../app/common/errors';
import { http_status_codes } from '../../app/common/enums';
import PaginationParams from '../../app/utils/pagination/paginationParams';

import 'express-async-errors';
import MapperConfigBase, { MapperConfig } from '../../app/utils/mapperConfigs/base/mapperConfigBase';

export interface ApiController {
    readonly path: string
    readonly router: Router

    getAll: express.RequestHandler
    getById: express.RequestHandler
    create: express.RequestHandler
    update: express.RequestHandler
    delete: express.RequestHandler
}

export default abstract class ControllerBase<T, TDto> implements ApiController {
    private readonly service: ApiService<T>
    private readonly mapperConfig: MapperConfig<T, TDto>
    readonly router: Router
    readonly path: string

    constructor(path: string, service: ApiService<T>, mapperConfig: MapperConfig<T, TDto>) {
        this.router = express.Router();
        this.service = service;
        this.path = path;
        this.mapperConfig = mapperConfig;

        this.initializeBasicRoutes();
        this.routes();
    }

    protected abstract routes(): void;

    private initializeBasicRoutes() {
        this.router.get('/', async (req: express.Request, res: express.Response) => await this.getAll(req, res));
        this.router.get('/:id', async (req: express.Request, res: express.Response) => await this.getById(req, res));
        this.router.post('/', async (req: express.Request, res: express.Response) => await this.create(req, res));
        this.router.put('/:id', async (req: express.Request, res: express.Response) => await this.update(req, res));
        this.router.delete('/:id', async (req: express.Request, res: express.Response) => await this.delete(req, res));
    }

    async getAll(req: express.Request, res: express.Response) {
        const params = new PaginationParams(
                parseInt(`${req.query.pageNum}`, 10), 
                parseInt(`${req.query.pageSize}`, 10),
                req.query.search as string | undefined,
                req.query.include as string | undefined,
                req.query.select as string | undefined,
                req.query.sort as string | undefined,
            )

        const result = await this.service.getAll(params)

        result.items = result.items.map(this.mapperConfig.forward);

        okResponse(res, result);
    }
    
    async getById(req: express.Request, res: express.Response) {
        const item = await this.service.getById(req.params.id);

        okResponse(res, this.mapperConfig.forward(await this.service.getById(req.params.id)));
    }
    
    async create(req: express.Request, res: express.Response) {
        const result = await this.service.create(req.body);

        okResponse(res, this.mapperConfig.forward(result));
    }
    
    async update(req: express.Request, res: express.Response) {
        const result = await this.service.update(req.params.id, req.body);

        okResponse(res, this.mapperConfig.forward(result));
    }

    async delete(req: express.Request, res: express.Response) {
        const result = await this.service.delete(req.params.id);

        noContentResponse(res);
    }
}