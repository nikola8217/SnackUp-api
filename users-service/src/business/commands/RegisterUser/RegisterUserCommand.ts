import { Role } from "../../../core/enums/Role";
import { RegisterUserValidator } from "./RegisterUserValidator";
import { RegisterUserResponse } from "../../responses/RegisterUserResponse";
import { RequestData } from 'mediatr-ts';

export class RegisterUserCommand extends RequestData<RegisterUserResponse> {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role
    ) {
        super();
        RegisterUserValidator.validateName(name);
        RegisterUserValidator.validateEmail(email);
        RegisterUserValidator.validatePassword(password);
        RegisterUserValidator.validateRole(role);
    }
}