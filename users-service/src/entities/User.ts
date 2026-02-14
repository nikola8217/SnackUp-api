import { Role } from "./enums/Role";
import { UserValidator } from "./validators/UserValidator";

export class User {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        public role: Role = Role.USER,
        public restaurantId?: string,
    ) {
        UserValidator.validateId(_id);
        UserValidator.validateEmail(email);
        UserValidator.validatePasswordHash(passwordHash);
        UserValidator.validateRole(role);
    }
}