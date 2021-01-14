export enum HttpStatusCodes {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

export enum InvitationStatus {
  Pending,
  Accepted,
  Declined
}

export enum InvitationFor {
  Friendship,
  ChessGame
}

export enum Genders {
  Unknown,
  Male,
  Female
}