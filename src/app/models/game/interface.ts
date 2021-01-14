import Mongoose from "mongoose";
import { ChessColours, PieceNames } from "../../common/constants";

export interface Move {
    moveNum: number
    turn: ChessColours;
    piece: PieceNames;
    from: number;
    to: number;
    capturedPiece?: PieceNames;
    promotion?: PieceNames;
}

export interface Side {
    score: number
    time: number
    player: string
}

export interface Game extends Mongoose.Document {
    position: string
    history: Move[]
    white: Side
    black: Side
}