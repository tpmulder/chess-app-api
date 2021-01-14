import ControllerBase from "./base/controllerBase";
import { Room } from "../app/models/room/interface";
import RoomDto from "../app/dtos/room/dto";
import RoomMapperConfig from "../app/utils/mapperConfigs/roomMapperConfig"

import 'express-async-errors';
import { IRoomService } from "../app/services/roomService";
import { inject } from "inversify";
import { TYPES } from "../config/types";

export default class RoomController extends ControllerBase<Room, RoomDto> {
    private readonly roomService: IRoomService;
    private readonly roomMapperConfig: RoomMapperConfig;

    constructor(roomService: IRoomService, mapping: RoomMapperConfig) {
        super("rooms", roomService, mapping);

        this.roomService = roomService;
        this.roomMapperConfig = mapping;
    }

    protected routes() {

    }
}