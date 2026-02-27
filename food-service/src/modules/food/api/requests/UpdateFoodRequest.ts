import { APIGatewayProxyEvent } from "aws-lambda";
import { UpdateFoodCommand } from "../../business/commands/UpdateFood/UpdateFoodCommand";
import { BadRequestError } from "@snackupapp/shared";

export class UpdateFoodRequest {
    static transform(event: APIGatewayProxyEvent): UpdateFoodCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { foodName: string; description: string; price: number, imageUrl: string; categoryId: string };

        return new UpdateFoodCommand(
            event.pathParameters?.id as string,
            body.foodName,
            body.description,
            body.price,
            body.imageUrl,
            body.categoryId
        );
    }
}
