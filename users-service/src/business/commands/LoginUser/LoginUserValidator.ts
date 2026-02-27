import { RequiredFieldError } from "@snackupapp/shared";

export class LoginUserValidator {
    static validateEmail(email: string): void {
        if (typeof email !== "string") throw new RequiredFieldError("Email is required");
    }

    static validatePassword(password: string): void {
        if (typeof password !== "string") throw new RequiredFieldError("Password is required");
    }
}