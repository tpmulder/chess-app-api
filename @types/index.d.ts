import { User } from "../src/app/models/user/interface";

declare global{
    namespace Express {
        interface Request {
            user: User
        }
    }
}