import { injectable } from 'tsyringe';
import { ITokenGenerator } from "../../business/ports/ITokenGenerator";
import jwt from "jsonwebtoken";
import { PayloadDto } from "../../business/dtos/PayloadDto";
import { SecretNotDefinedError } from "@snackupapp/shared";

@injectable()
export class TokenGenerator implements ITokenGenerator {
    generate(payload: PayloadDto): string{
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new SecretNotDefinedError();
        }

        const userJwt = jwt.sign(
            {
                id: payload.userId,
                email: payload.email,
                role: payload.role
            },
            secret,
            { expiresIn: '1d' } 
        );

        return userJwt;
    }
}