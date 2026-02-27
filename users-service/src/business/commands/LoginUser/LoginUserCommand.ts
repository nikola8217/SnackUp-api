import { RequestData } from 'mediatr-ts';
import { LoginUserValidator } from './LoginUserValidator';

export class LoginUserCommand extends RequestData<string> {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {
        super();
        LoginUserValidator.validateEmail(email);
        LoginUserValidator.validatePassword(password);
    }
}