import Mongoose from "mongoose";
import { chess_colours, piece_names } from "../../common/enums";

export interface Move {
    moveNum: number
    turn: chess_colours;
    piece: piece_names;
    from: number;
    to: number;
    capturedPiece?: piece_names;
    promotion?: piece_names;
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