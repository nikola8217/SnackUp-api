import { Role } from "../entities/enums/Role";
import { User } from "../entities/User";

export interface UserDbItem {
    _id: string;
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
            _id: user._id,
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
            item._id,
            item.name,
            item.email,
            item.passwordHash,
            item.role as Role
        );
    }
}
