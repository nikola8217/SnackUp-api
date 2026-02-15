import { APIGatewayProxyEvent } from "aws-lambda";
import { RegisterUserDto } from "../dtos/RegisterUserDto";
import { RegisterUserValidator } from "./requestValidators/RegisterUserValidator";
import { Role } from "../entities/enums/Role";

export class RegisterUserRequest {
    static toDto(event: APIGatewayProxyEvent): RegisterUserDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        RegisterUserValidator.validate(raw);

        const body = raw as RegisterUserDto;

        return {
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role ?? Role.USER,
        };
    }
}
