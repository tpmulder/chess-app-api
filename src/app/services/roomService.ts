import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../config/types";
import { Room } from "../models/room/interface";
import { IRoomRepository } from "../repositories/roomRepository";
import { ServiceBase, ApiService } from "./base/serviceBase";

interface IRoomService extends ApiService<Room> {

}

@injectable()
class RoomService extends ServiceBase<Room> implements IRoomService {
    private readonly roomRepository: IRoomRepository;

    constructor(
        @inject(TYPES.IRoomRepository) roomRepo: IRoomRepository
    ) {
        super(roomRepo)

        this.roomRepository = roomRepo;
    }
}

export { IRoomService, RoomService }