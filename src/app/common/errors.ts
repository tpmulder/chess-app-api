import { error_messages, http_status_codes } from "./enums";

export class ApiError extends Error {
    status: http_status_codes;
    validationErrors?: ValidationError[]

    constructor(status: http_status_codes, errorMessage: string, validationErrors?: ValidationError[]) {
        super();
        
        this.status = status;
        this.name = ApiError.getNameFromStatus(status);
        this.message = errorMessage;
        this.validationErrors = validationErrors;
    }

    static convert(error: any): ApiError {
        let err = new ApiError(http_status_codes.internal_server_error, error.message);

        err.name = error.name;

        return err;
    }

    private static getNameFromStatus(status: http_status_codes): string {
        switch (status) {
            case http_status_codes.bad_request:
                return "Invalid request";
            case http_status_codes.unauthorized:
                return "Unauthorized";
            case http_status_codes.not_found:
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
        super(http_status_codes.not_found, error_messages.not_found
            .replace('{ITEM}', itemName ? itemName : 'Item')
            .replace('{PATH}', searchProp ? searchProp : 'id')
            .replace('{VAL}', searchVal))
    }
}

export class InvalidReferenceError extends ApiError {
    constructor(searchVal: string, itemName?: string, searchProp?: string) {
        super(http_status_codes.bad_request, error_messages.not_found
            .replace('{ITEM}', itemName ? itemName : 'Item')
            .replace('{PATH}', searchProp ? searchProp : 'id')
            .replace('{VAL}', searchVal))
    }
}

export class InvalidParametersError extends ApiError {
    constructor(errors: ValidationError[]) {
        super(http_status_codes.bad_request, error_messages.invalid_parameters, errors)
    }
}