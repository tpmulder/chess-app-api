import { Room } from "../models/room/interface";
import RoomRepository from "../repositories/roomRepository";
import UserRepository from "../repositories/userRepository";
import ServiceBase from "./base/serviceBase";

export default class RoomService extends ServiceBase<Room> {
    private readonly roomRepository: RoomRepository;

    constructor() {
        const repo = new RoomRepository();
        super(repo)

        this.roomRepository = repo;
    }
}