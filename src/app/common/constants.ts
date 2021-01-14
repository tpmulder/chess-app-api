export enum Environment {
    Local = "local",
    Dev = "development",
    Prod = "production"
  }
  
  export enum ErrorMessages {
    InternalServerError = "Something went wrong",
    Unauthorized = "You do not have permission to access this data.",
    InvalidParameters = "The parameters supplied were invalid",
    NotFound = "{ITEM} with {PATH} '{VAL}' does not exist"
  }
  
  export enum ChessColours {
    black = 'b',
    white = 'w'
  }
  
  export enum PieceNames {
    BlackPawn = 'p',
    BlackRook = 'r',
    BlackKnight = 'n',
    BlackQueen = 'q',
    BlackKing = 'k',
    BlackBisshop = 'b',
    WhitePawn = 'P',
    WhiteRook = 'R',
    WhiteKnight = 'N',
    WhiteQueen = 'Q',
    WhiteKing = 'K',
    WhiteBisshop = 'B'
  }
  
  export enum UserProviders {
    Auth0 = 'auth0'
  }
  
  export enum ChatEvents {
    Connected = 'connected',
    Chatting = 'chatting',
    Disconnected = 'disconnected'
  }