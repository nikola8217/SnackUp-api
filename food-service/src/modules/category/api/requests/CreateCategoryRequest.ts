import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateCategoryCommand } from "../../business/commands/CreateCategory/CreateCategoryCommand";
import { BadRequestError } from "@snackupapp/shared";

export class CreateCategoryRequest {
    static transform(event: APIGatewayProxyEvent): CreateCategoryCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { categoryName: string };

        return new CreateCategoryCommand(
            body.categoryName
        );
    }
}
