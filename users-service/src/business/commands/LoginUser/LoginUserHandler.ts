import { injectable, inject } from 'tsyringe';
import { InvalidCredentialsError } from "@snackupapp/shared";
import { LoginUserCommand } from "./LoginUserCommand";
import { IUserRepository } from "../../ports/IUserRepository";
import { IPasswordHasher } from "../../ports/IPasswordHasher";
import { ITokenGenerator } from "../../ports/ITokenGenerator";
import { RequestHandler, requestHandler } from 'mediatr-ts';

@injectable()
@requestHandler(LoginUserCommand)
export class LoginUserHandler implements RequestHandler<LoginUserCommand, string> {
    
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository,
        @inject('IPasswordHasher') private passwordHasher: IPasswordHasher,
        @inject('ITokenGenerator') private tokenGenerator: ITokenGenerator
    ) {}

    async handle(command: LoginUserCommand): Promise<string> {

        const user = await this.userRepository.getUserByEmail(command.email);

        if (!user) throw new InvalidCredentialsError("Invalid email");

        const isPasswordValid = await this.passwordHasher.compare(command.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError("Invalid password");
        }

        const token = this.tokenGenerator.generate({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        return token;

    }
}