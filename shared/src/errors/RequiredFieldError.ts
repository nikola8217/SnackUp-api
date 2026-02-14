import { AppError } from "./AppError";

export class RequiredFieldError extends AppError {
    constructor(message = "Field is required") {
        super(message, 400); 
    }
}