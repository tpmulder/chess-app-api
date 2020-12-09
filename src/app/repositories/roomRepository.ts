import { Room } from "../models/room/interface";
import RoomSchema, { RoomModel } from "../models/room/schema"
import User from "../models/user/interface";
import { RepositoryBase } from "./base/mongoRepositoryBase"

export default class RoomRepository extends RepositoryBase<Room> {
    private readonly roomModel: RoomModel
    
    constructor() {
        super(RoomSchema);

        this.roomModel = RoomSchema;
    }
}