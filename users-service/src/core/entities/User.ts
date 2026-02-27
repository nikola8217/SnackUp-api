import { Role } from "../enums/Role";
import { UserValidator } from "../validators/UserValidator";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        public role: Role = Role.USER,
    ) {
        UserValidator.validateId(id);
        UserValidator.validateName(name);
        UserValidator.validateEmail(email);
        UserValidator.validatePasswordHash(passwordHash);
        UserValidator.validateRole(role);
    }
}