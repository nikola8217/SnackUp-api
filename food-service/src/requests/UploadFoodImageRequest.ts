import { APIGatewayProxyEvent } from "aws-lambda";
import { UploadFoodImageDto } from "../dtos/UploadFoodImageDto";

export class UploadFoodImageRequest {
    static toDto(event: APIGatewayProxyEvent): UploadFoodImageDto {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        const body = raw as UploadFoodImageDto;

        return {
            foodId: body.foodId,
            contentType: body.contentType,
        };
    }
}
