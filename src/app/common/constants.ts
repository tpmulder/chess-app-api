export class Environment {
    static local = "local"
    static dev = "development"
    static prod = "production"
  }
  
  export class ErrorMessages {
    static internalServerError = "Something went wrong"
    static unauthorized = "You do not have permission to access this data."
    static invalidParameters = "The parameters supplied were invalid"
    static notFound = "{ITEM} with {PATH} '{VAL}' does not exist"
  }
  
  export class ChessColours {
    static black = 'b'
    static white = 'w'
  }
  
  export class PieceNames {
    static blackPawn = 'p'
    static blackRook = 'r'
    static blackKnight = 'n'
    static blackQueen = 'q'
    static blackKing = 'k'
    static blackBisshop = 'b'
    static whitePawn = 'P'
    static whiteRook = 'R'
    static whiteKnight = 'N'
    static whiteQueen = 'Q'
    static whiteKing = 'K'
    static whiteBisshop = 'B'
  }
  
  export class UserProviders {
    static auth0 = 'Auth0'
  }
  
  export class ChatEvents {
    static connected = 'connected'
    static chatting = 'chatting'
    static disconnected = 'disconnected'
  }