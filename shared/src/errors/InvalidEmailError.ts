import { AppError } from "./AppError";

export class InvalidEmailError extends AppError {
    constructor(message = "Email is invalid") {
        super(message, 400); 
    }
}