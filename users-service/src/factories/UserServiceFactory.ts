import { UserRepository } from "../repositories/UserRepository";
import { PasswordHasher } from "../libs/PasswordHasher";
import { UserService } from "../services/UserService";

const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher();

export const userService = new UserService(userRepository, passwordHasher);