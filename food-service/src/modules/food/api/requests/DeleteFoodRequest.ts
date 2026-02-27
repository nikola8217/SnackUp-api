import { APIGatewayProxyEvent } from "aws-lambda";
import { DeleteFoodCommand } from "../../business/commands/DeleteFood/DeleteFoodCommand";

export class DeleteFoodRequest {
    static transform(event: APIGatewayProxyEvent): DeleteFoodCommand {
        return new DeleteFoodCommand(
            event.pathParameters?.id as string,
        );
    }
}
