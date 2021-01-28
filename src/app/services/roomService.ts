import { Room } from "../models/room/interface";
import { IRoomRepository, RoomRepository } from "../repositories/roomRepository";
import { ServiceBase, ApiService } from "./base/serviceBase";

interface IRoomService extends ApiService<Room> {

}

class RoomService extends ServiceBase<Room> implements IRoomService {
    private readonly roomRepository: IRoomRepository;

    constructor() {
        const repo = new RoomRepository();
        super(repo)

        this.roomRepository = repo;
    }
}

export { IRoomService, RoomService }