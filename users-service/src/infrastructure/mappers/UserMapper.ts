import { Role } from "../../core/enums/Role";
import { User } from "../../core/entities/User";

export interface UserDbItem {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export class UserMapper {
    static toPersistence(user: User): UserDbItem {
        const now = new Date().toISOString();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            createdAt: now,
            updatedAt: now,
        };
    }

    static toDomain(item: UserDbItem): User {
        return new User(
            item.id,
            item.name,
            item.email,
            item.passwordHash,
            item.role as Role
        );
    }
}
