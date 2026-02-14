import { AppError } from "./AppError";

export class InvalidCredentialsError extends AppError {
    constructor(message = "Invalid credentials") {
        super(message, 401); 
    }
}