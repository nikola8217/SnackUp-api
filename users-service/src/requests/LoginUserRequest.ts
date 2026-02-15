import { APIGatewayProxyEvent } from "aws-lambda";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { LoginUserValidator } from "./requestValidators/LoginUserValidator";

export class LoginUserRequest {
    static toDto(event: APIGatewayProxyEvent): LoginUserDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        LoginUserValidator.validate(raw);

        const body = raw as LoginUserDto;

        return {
            email: body.email,
            password: body.password,
        };
    }
}
