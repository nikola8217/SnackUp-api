import { AppError } from "./AppError";

export class EmailAlreadyTakenError extends AppError {
    constructor(message = "Email is already in use") {
        super(message, 409); 
    }
}