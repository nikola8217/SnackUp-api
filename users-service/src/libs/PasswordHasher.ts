import { IPasswordHasher } from "../services/ports/IPasswordHasher";
import bcrypt from "bcryptjs";

export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);  
    }
}