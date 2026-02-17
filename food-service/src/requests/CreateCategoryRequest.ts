import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { CreateCategoryValidator } from "./requestValidators/CreateCategoryValidator";

export class CreateCategoryRequest {
    static toDto(event: APIGatewayProxyEvent): CreateCategoryDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        CreateCategoryValidator.validate(raw);

        const body = raw as CreateCategoryDto;

        return {
            categoryName: body.categoryName,
        };
    }
}
