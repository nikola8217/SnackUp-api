import { AppError } from "./AppError";

export class SecretNotDefinedError extends AppError {
    constructor(message = "Secret is not defined") {
        super(message, 500); 
    }
}