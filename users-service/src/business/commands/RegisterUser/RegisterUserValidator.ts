import { RequiredFieldError } from "@snackupapp/shared";
import { InvalidEmailError } from "@snackupapp/shared";
import { BadRequestError } from "@snackupapp/shared";
import { Role } from "../../../core/enums/Role";

export class RegisterUserValidator {
    static validateName(name: string): void {
        if (typeof name !== "string" || name.trim() === "") throw new RequiredFieldError("Name is required");
    }

    static validateEmail(email: string): void {
        if (typeof email !== "string") throw new RequiredFieldError("Email is required");
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) throw new InvalidEmailError();
    }

    static validatePassword(password: string): void {
        if (typeof password !== "string") throw new RequiredFieldError("Password is required");
        
        if (password.length < 8) throw new BadRequestError("Password must be at least 8 characters long");
    }

    static validateRole(role: Role): void {
        if (!Object.values(Role).includes(role as Role)) throw new BadRequestError("Invalid role");     
    }
}