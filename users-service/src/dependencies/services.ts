import { UserRepository } from "../repositories/UserRepository";
import { PasswordHasher } from "../libs/PasswordHasher";
import { UserService } from "../services/UserService";
import { TokenGenerator } from "../libs/TokenGenerator";
import { AuthService } from "../services/AuthService";

const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher();
const tokenGenerator = new TokenGenerator();

export const userService = new UserService(userRepository, passwordHasher);

export const authService = new AuthService(userRepository, passwordHasher, tokenGenerator);