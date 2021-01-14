import { Response } from "express";
import { HttpStatusCodes } from "./enums";
import { ApiError, ValidationError } from "./errors";

class ApiResponse {
  result?: any;
  error?: ApiError;

  constructor(result?: any, error?: ApiError) {
    this.result = result;
    this.error = error;
  }
}

export const okResponse = (res: Response, data: any) =>
  createSuccessResponse(res, HttpStatusCodes.Ok, data);

export const noContentResponse = (res: Response) => {
  res.status(HttpStatusCodes.NoContent).json();
}

export const createdResponse = (res: Response, data: any) =>
  createSuccessResponse(res, HttpStatusCodes.Created, data);

export const internalServerErrorResponse = (res: Response, errorMessage: string) =>
  createErrorResponse(res, HttpStatusCodes.InternalServerError, errorMessage);

export const unauthorizedResponse = (res: Response, errorMessage: string) =>
  createErrorResponse(res, HttpStatusCodes.Unauthorized, errorMessage);

export const badRequestResponse = (res: Response, errorMessage: string, validationErrors: ValidationError[]) =>
  createErrorResponse(res, HttpStatusCodes.BadRequest, errorMessage, validationErrors);

export const apiErrorResponse = (res: Response, error: ApiError) => 
  res.status(error.status).json(new ApiResponse(undefined, error));

const createErrorResponse = (res: Response, statusCode: HttpStatusCodes, errorMessage: string, validationErrors?: ValidationError[]) => {
  res.status(statusCode).json(new ApiResponse(undefined, new ApiError(statusCode, errorMessage, validationErrors)));
}

const createSuccessResponse = (res: Response, statusCode: HttpStatusCodes, data?: any) => {
  res.status(statusCode).json(new ApiResponse(data));
}