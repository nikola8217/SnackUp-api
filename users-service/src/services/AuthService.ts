import { InvalidCredentialsError } from "@snackupapp/shared";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { IUserRepository } from "./ports/IUserRepository";
import { IPasswordHasher } from "./ports/IPasswordHasher";
import { ITokenGenerator } from "./ports/ITokenGenerator";

export class AuthService {
    constructor(
        private userRepository: IUserRepository,
        private passwordHahser: IPasswordHasher,
        private tokenGenerator: ITokenGenerator
    ) {}

    async loginUser(dto: LoginUserDto): Promise<string> {
        const user = await this.userRepository.getUserByEmail(dto.email);

        if (!user) throw new InvalidCredentialsError("Invalid email");

        const isPasswordValid = await this.passwordHahser.compare(dto.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError("Invalid password");
        }

        const token = this.tokenGenerator.generate({
            userId: user._id,
            email: user.email,
            role: user.role
        });

        return token;
    }
}