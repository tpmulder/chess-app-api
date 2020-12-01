import { Response } from "express";
import { http_status_codes } from "./enums";
import { ApiError } from "./errors";

class ApiResponse {
  result?: any;
  error?: ApiError;

  constructor(result?: any, error?: ApiError) {
    this.result = result;
    this.error = error;
  }
}

export const okResponse = (res: Response, data: any) =>
  createSuccessResponse(res, http_status_codes.ok, data);

export const noContentResponse = (res: Response) => {
  res.status(http_status_codes.no_content).json();
}

export const createdResponse = (res: Response, data: any) =>
  createSuccessResponse(res, http_status_codes.created, data);

export const internalServerErrorResponse = (res: Response, errorMessage: string) =>
  createErrorResponse(res, http_status_codes.internal_server_error, errorMessage);

export const unauthorizedResponse = (res: Response, errorMessage: string) =>
  createErrorResponse(res, http_status_codes.unauthorized, errorMessage);

export const badRequestResponse = (res: Response, errorMessage: string) =>
  createErrorResponse(res, http_status_codes.bad_request, errorMessage);

export const apiErrorResponse = (res: Response, error: ApiError) => 
  createErrorResponse(res, error.status, error.message);

const createErrorResponse = (res: Response, statusCode: http_status_codes, errorMessage: string) => {
  res.status(statusCode).json(new ApiResponse(undefined, new ApiError(statusCode, errorMessage)));
}

const createSuccessResponse = (res: Response, statusCode: http_status_codes, data?: any) => {
  res.status(statusCode).json(new ApiResponse(data));
}