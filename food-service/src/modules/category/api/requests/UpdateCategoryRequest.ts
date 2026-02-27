import { APIGatewayProxyEvent } from "aws-lambda";
import { UpdateCategoryCommand } from "../../business/commands/UpdateCategory/UpdateCategoryCommand";
import { BadRequestError } from "@snackupapp/shared";

export class UpdateCategoryRequest {
    static transform(event: APIGatewayProxyEvent): UpdateCategoryCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { categoryName: string };

        return new UpdateCategoryCommand(
            event.pathParameters?.id as string,
            body.categoryName
        );
    }
}
