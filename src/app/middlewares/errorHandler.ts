import { NextFunction, Request, Response } from "express";
import { error_messages } from "../common/enums";
import { ApiError } from "../common/errors";
import { apiErrorResponse, internalServerErrorResponse, unauthorizedResponse } from "../common/responses";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
        if((err as ApiError).status !== undefined) 
            apiErrorResponse(res, err);
        else if(err.name === "UnauthorizedError") 
            unauthorizedResponse(res, err.message);
        else 
            internalServerErrorResponse(res, error_messages.internal_server_error);
}