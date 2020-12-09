import ControllerBase from "./base/controllerBase";
import RoomService from "../app/services/roomService";
import { Room } from "../app/models/room/interface";
import RoomDto from "../app/models/room/dto";
import RoomMapperConfig from "../app/utils/mapperConfigs/roomMapperConfig"

import 'express-async-errors';

export default class RoomController extends ControllerBase<Room, RoomDto> {
    private readonly roomService: RoomService;
    private readonly roomMapperConfig: RoomMapperConfig;

    constructor() {
        const service = new RoomService();
        const config = new RoomMapperConfig();
        super("rooms", service, config);

        this.roomService = service;
        this.roomMapperConfig = config;
    }

    protected routes() {

    }
}