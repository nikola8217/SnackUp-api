import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateFoodDto } from "../dtos/CreateFoodDto";
import { CreateFoodValidator } from "./requestValidators/CreateFoodValidator";

export class CreateFoodRequest {
    static toDto(event: APIGatewayProxyEvent): CreateFoodDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        CreateFoodValidator.validate(raw);

        const body = raw as CreateFoodDto;

        return {
            foodName: body.foodName,
            description: body.description,
            price: body.price,
            imageUrl: body.imageUrl,
            categoryId: body.categoryId
        };
    }
}
