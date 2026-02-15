import { Role } from "../entities/enums/Role";

export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}