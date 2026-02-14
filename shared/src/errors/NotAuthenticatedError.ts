import { AppError } from "./AppError";

export class NotAuthenticatedError extends AppError {
    constructor(message = "Not authenticated") {
        super(message, 401); 
    }
}