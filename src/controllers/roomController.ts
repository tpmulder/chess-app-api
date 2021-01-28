import ControllerBase from "./base/controllerBase";
import { Room } from "../app/models/room/interface";
import roomMapperConfig, { RoomMapperConfig } from "../app/utils/mapperConfigs/roomMapperConfig"

import 'express-async-errors';
import RoomDto from "../app/dtos/room/dto";
import { RoomService } from "../app/services/roomService";

export default class RoomController extends ControllerBase<Room, RoomDto> {
    private readonly roomService: RoomService;
    private readonly roomMapperConfig: RoomMapperConfig;

    constructor() {
        const service = new RoomService();
        super("rooms", service, roomMapperConfig);

        this.roomService = service;
        this.roomMapperConfig = roomMapperConfig;
    }

    protected routes() {

    }
}