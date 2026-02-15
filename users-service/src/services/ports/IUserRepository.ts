import { User } from "../../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;

    getUserByEmail(email: string): Promise<User | null>;
}