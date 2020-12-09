export enum http_status_codes {
  ok = 200,
  created = 201,
  no_content = 204,
  bad_request = 400,
  unauthorized = 401,
  not_found = 404,
  internal_server_error = 500
}

export enum genders {
  male = 'M',
  female = 'V',
  unknown = 'U',
}

export enum environment {
  local = "local",
  development = "development",
  production = "production"
}

export enum error_messages {
  internal_server_error = "Something went wrong",
  unauthorized = "You do not have permission to access this data.",
  invalid_parameters = "The parameters supplied were invalid",
  not_found = "{ITEM} with {PATH} '{VAL}' does not exist"
}

export enum chess_colours {
  black = 'b',
  white = 'w'
}

export enum challenge_status {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined'
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

export enum chat_events {
  connected = 'connected',
  chatting = 'chatting',
  disconnected = 'disconnected'
}

export enum query_operators {
  eq = 'eq',
  in = 'in',
  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  ne = 'ne',
  nin = 'nin'
}