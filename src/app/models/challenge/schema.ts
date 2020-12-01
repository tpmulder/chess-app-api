import Mongoose, { Model } from "mongoose";
import { Challenge } from "./interface";

export interface ChallengeModel extends Model<Challenge> {
  
}

const challengeSchema = new Mongoose.Schema({
    contestant: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    challenger: {
        ref: 'User',
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Number, default: 0
    },
    time: {
        type: Date, required: true
    }
})

export default Mongoose.model<Challenge & ChallengeModel>("Challenge", challengeSchema);