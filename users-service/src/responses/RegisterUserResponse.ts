import { Role } from "../entities/enums/Role";

export interface RegisterUserResponse {
    id: string;
    name: string;
    email: string;
    role: Role;
}