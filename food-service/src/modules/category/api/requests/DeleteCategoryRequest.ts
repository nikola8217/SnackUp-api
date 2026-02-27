import { APIGatewayProxyEvent } from "aws-lambda";
import { DeleteCategoryCommand } from "../../business/commands/DeleteCategory/DeleteCategoryCommand";

export class DeleteCategoryRequest {
    static transform(event: APIGatewayProxyEvent): DeleteCategoryCommand {
        return new DeleteCategoryCommand(
            event.pathParameters?.id as string,
        );
    }
}
