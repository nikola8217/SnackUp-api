import { IUserRepository } from "./ports/IUserRepository";
import { EmailAlreadyTakenError } from "@snackupapp/shared";
import { IPasswordHasher } from "./ports/IPasswordHasher";
import { User } from "../entities/User";
import { randomUUID } from "crypto";
import { RegisterUserDto } from "../dtos/RegisterUserDto";
import { RegisterUserResponse } from "../responses/RegisterUserResponse";

export class UserService {
    constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}

    async registerUser(dto: RegisterUserDto): Promise<RegisterUserResponse> {
        const emailIsTaken = await this.userRepository.getUserByEmail(dto.email);

        if (emailIsTaken) throw new EmailAlreadyTakenError();

        const passwordHash = await this.passwordHasher.hash(dto.password);

        const user = new User(
            randomUUID(),
            dto.name,
            dto.email,
            passwordHash,
            dto.role
        );

        const createdUser = await this.userRepository.createUser(user);

        return {
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        }
    }
}