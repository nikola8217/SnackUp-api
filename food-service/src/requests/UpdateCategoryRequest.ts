import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateCategoryValidator } from "./requestValidators/CreateCategoryValidator";
import { UpdateCategoryDto } from "../dtos/UpdateCategoryDto";

export class UpdateCategoryRequest {
    static toDto(event: APIGatewayProxyEvent): UpdateCategoryDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        CreateCategoryValidator.validate(raw);

        const body = raw as UpdateCategoryDto;

        return {
            id: event.pathParameters?.id as string,
            categoryName: body.categoryName,
        };
    }
}
