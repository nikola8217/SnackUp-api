import { injectable } from 'tsyringe';
import { IPasswordHasher } from "../../business/ports/IPasswordHasher";
import bcrypt from "bcryptjs";

@injectable()
export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);  
    }
}