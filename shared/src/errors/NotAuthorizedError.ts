import { AppError } from "./AppError";

export class NotAuthorizedError extends AppError {
    constructor(message = "Not authorized") {
        super(message, 401); 
    }
}