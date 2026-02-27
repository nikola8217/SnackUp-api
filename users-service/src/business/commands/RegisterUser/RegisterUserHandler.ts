import { injectable, inject } from 'tsyringe';
import { IUserRepository } from "../../ports/IUserRepository";
import { EmailAlreadyTakenError } from "@snackupapp/shared";
import { IPasswordHasher } from "../../ports/IPasswordHasher";
import { User } from "../../../core/entities/User";
import { randomUUID } from "crypto";
import { RegisterUserResponse } from "../../responses/RegisterUserResponse";
import { RegisterUserCommand } from "./RegisterUserCommand";
import { RequestHandler, requestHandler } from 'mediatr-ts';

@injectable()
@requestHandler(RegisterUserCommand)
export class RegisterUserHandler implements RequestHandler<RegisterUserCommand, RegisterUserResponse> {

    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository,
        @inject('IPasswordHasher') private passwordHasher: IPasswordHasher
    ) {}

    async handle(command: RegisterUserCommand): Promise<RegisterUserResponse> {

        const emailIsTaken = await this.userRepository.getUserByEmail(command.email);

        if (emailIsTaken) throw new EmailAlreadyTakenError();

        const passwordHash = await this.passwordHasher.hash(command.password);

        const user = new User(
            randomUUID(),
            command.name,
            command.email,
            passwordHash,
            command.role
        );

        const createdUser = await this.userRepository.createUser(user);

        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        }

    }
}