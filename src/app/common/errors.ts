import { http_status_codes } from "./enums";

export class ApiError extends Error {
    status: http_status_codes;

    constructor(status: http_status_codes, errorMessage: string) {
        super();
        
        this.status = status;
        this.name = ApiError.getNameFromStatus(status);
        this.message = errorMessage;
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
            case http_status_codes.internal_server_error:
                return "Internal server error";
            case http_status_codes.unauthorized:
                return "Unauthorized";
            default:
                return "request successful!";
        }
    }
}

export class NotFoundError extends Error {
    constructor(objName: string) {
        let msg = `${objName} not found.`;
        super(msg);
    }
}