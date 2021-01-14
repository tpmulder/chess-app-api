import { injectable } from "inversify";
import { Room } from "../models/room/interface";
import RoomSchema, { RoomModel } from "../models/room/schema"
import "reflect-metadata";
import { MongoRepository, RepositoryBase } from "./base/mongoRepositoryBase"

interface IRoomRepository extends MongoRepository<Room> {

}

@injectable()
class RoomRepository extends RepositoryBase<Room> implements IRoomRepository {
    private readonly roomModel: RoomModel
    
    constructor() {
        super(RoomSchema);

        this.roomModel = RoomSchema;
    }
}

export { IRoomRepository, RoomRepository }