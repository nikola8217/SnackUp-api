import { Role } from "../../core/enums/Role";

export interface RegisterUserResponse {
    id: string;
    name: string;
    email: string;
    role: Role;
}