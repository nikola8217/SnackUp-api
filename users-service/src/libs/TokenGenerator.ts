import { ITokenGenerator } from "../services/ports/ITokenGenerator";
import jwt from "jsonwebtoken";
import { PayloadDto } from "../dtos/PayloadDto";
import { SecretNotDefinedError } from "@snackupapp/shared";

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