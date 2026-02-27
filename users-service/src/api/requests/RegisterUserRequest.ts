import { APIGatewayProxyEvent } from "aws-lambda";
import { RegisterUserCommand } from "../../business/commands/RegisterUser/RegisterUserCommand";
import { Role } from "../../core/enums/Role";
import { BadRequestError } from "@snackupapp/shared";

export class RegisterUserRequest {
    static transform(event: APIGatewayProxyEvent): RegisterUserCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");
        
        const body = raw as { name: string; email: string; password: string; role?: Role };

        return new RegisterUserCommand(
            body.name,
            body.email,
            body.password,
            body.role ?? Role.USER
        );
    }
}
