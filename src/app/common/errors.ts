import { ErrorMessages } from "./constants";
import { HttpStatusCodes } from "./enums";

export class ApiError extends Error {
    status: HttpStatusCodes;
    validationErrors?: ValidationError[]

    constructor(status: HttpStatusCodes, errorMessage: string, validationErrors?: ValidationError[]) {
        super();
        
        this.status = status;
        this.name = ApiError.getNameFromStatus(status);
        this.message = errorMessage;
        this.validationErrors = validationErrors;
    }

    static parse(error: any): ApiError {
        let err = new ApiError(HttpStatusCodes.InternalServerError, error.message);
        err.name = error.name;

        return err;
    }

    private static getNameFromStatus(status: HttpStatusCodes): string {
        switch (status) {
            case HttpStatusCodes.BadRequest:
                return "Invalid request";
            case HttpStatusCodes.Unauthorized:
                return "Unauthorized";
            case HttpStatusCodes.NotFound:
                return "Not found";
            default:
                return "Internal server error";
        }
    }
}

export class ValidationError {
    constructor(public readonly field: string, public readonly message: string) { }
}

export class NotFoundError extends ApiError {
    constructor(searchVal: string, itemName?: string, searchProp?: string) {
        super(HttpStatusCodes.NotFound, ErrorMessages.notFound
            .replace('{ITEM}', itemName ? itemName : 'Item')
            .replace('{PATH}', searchProp ? searchProp : 'id')
            .replace('{VAL}', searchVal))
    }
}

export class InvalidReferenceError extends ApiError {
    constructor(searchVal: string, itemName?: string, searchProp?: string) {
        super(HttpStatusCodes.BadRequest, ErrorMessages.notFound
            .replace('{ITEM}', itemName ? itemName : 'Item')
            .replace('{PATH}', searchProp ? searchProp : 'id')
            .replace('{VAL}', searchVal))
    }
}

export class InvalidParametersError extends ApiError {
    constructor(errors: ValidationError[]) {
        super(HttpStatusCodes.BadRequest, ErrorMessages.invalidParameters, errors)
    }
}