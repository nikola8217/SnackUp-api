import { RequiredFieldError } from "@snackupapp/shared";
import { InvalidEmailError } from "@snackupapp/shared";
import { BadRequestError } from "@snackupapp/shared";
import { Role } from "../enums/Role";

export class UserValidator {
    static validateId(id: string): void {
        if (!id) throw new RequiredFieldError("Id is required");
    }
    
    static validateName(name: string): void {
        if (!name) throw new RequiredFieldError("Name is required");
    }

    static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) throw new InvalidEmailError();
    }

    static validatePasswordHash(passwordHash: string): void {
        if (!passwordHash) throw new RequiredFieldError("Password hash is required");
    }

    static validateRole(role: Role): void {
        if (!Object.values(Role).includes(role)) throw new BadRequestError("Invalid role");
    }
}