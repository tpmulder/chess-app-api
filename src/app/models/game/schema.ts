import Mongoose, { Model } from "mongoose";
import { ChessColours, PieceNames } from "../../common/constants";
import { Game } from "./interface";
import UserSchema from "../user/schema";

export interface GameModel extends Model<Game> {

}

const moveSchema = new Mongoose.Schema({
  moveNum: {
    type: Number, required: true
  },
  turn: {
    type: String, enum: Object.values(ChessColours), required: true
  },
  piece: {
    type: String, enum: Object.values(PieceNames), required: true
  },
  from: {
    type: String, required: true
  },
  to: {
    type: String, required: true
  },
  capturedPiece: {
    type: String
  },
  promotion: {
    type: String, enum: Object.values(PieceNames)
  }
}, { _id: false })

const sideSchema = new Mongoose.Schema({
  score: {
    type: Number, default: 0
  },
  time: {
    type: Number, default: 0
  },
  player: {
    ref: 'User',
    type: Mongoose.Schema.Types.ObjectId
  }
}, { _id: false })
  
const gameSchema = new Mongoose.Schema({
  position: {
    type: String, required: true
  },
  history: [{
    type: moveSchema
  }],
  white: {
    type: sideSchema, required: true
  },
  black: {
    type: sideSchema, required: true
  }
});

// gameSchema.pre<Game>('save', async function(): Promise<void> {
//   try {
//     if(this.isModified('white.player')) {
//       UserSchema.findByIdAndUpdate(this.white.player, { $push: { games: this.id } });
//     } else if (this.isModified('black.player')) {
//       UserSchema.findByIdAndUpdate(this.black.player, { $push: { games: this.id } });
//     }
//   }
//   catch (error) {
//     throw error;
//   }
// });

export default Mongoose.model<Game & GameModel>("Game", gameSchema);