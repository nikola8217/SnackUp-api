import { APIGatewayProxyEvent } from "aws-lambda";
import { LoginUserCommand } from "../../business/commands/LoginUser/LoginUserCommand";
import { BadRequestError } from "@snackupapp/shared";

export class LoginUserRequest {
    static transform(event: APIGatewayProxyEvent): LoginUserCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { email: string; password: string; };

        return new LoginUserCommand(
            body.email,
            body.password
        );
    }
}
