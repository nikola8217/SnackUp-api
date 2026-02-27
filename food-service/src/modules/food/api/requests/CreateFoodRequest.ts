import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateFoodCommand } from "../../business/commands/CreateFood/CreateFoodCommand";
import { BadRequestError } from "@snackupapp/shared";

export class CreateFoodRequest {
    static transform(event: APIGatewayProxyEvent): CreateFoodCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { foodName: string, description: string, price: number, imageUrl: string, categoryId: string };

        return new CreateFoodCommand(
            body.foodName,
            body.description,
            body.price,
            body.imageUrl,
            body.categoryId
        );
    }
}
