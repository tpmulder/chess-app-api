export enum http_status_codes {
  ok = 200,
  created = 201,
  no_content = 204,
  bad_request = 400,
  unauthorized = 401,
  internal_server_error = 500
}

export enum genders {
  male = 2,
  female = 1,
  unknown = 0,
}

export enum environment {
  local = "local",
  development = "development",
  production = "production"
}

export enum error_messages {
  internal_server_error = "Something went wrong",
  unauthorized = "You do not have permission to access this data.",
  success = "Request successful."
}

export enum chess_colours {
  black = 'b',
  white = 'w'
}

export enum challenge_status {
  pending = 0,
  accepted = 1,
  declined = 2
}

export enum piece_names {
  black_pawn = 'p',
  black_rook = 'r',
  black_knight = 'n',
  black_queen = 'q',
  black_king = 'k',
  black_bishop = 'b',
  white_pawn = 'P',
  white_rook = 'R',
  white_knight = 'N',
  white_queen = 'Q',
  white_king = 'K',
  white_bishop = 'B',
}