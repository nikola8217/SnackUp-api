import { APIGatewayProxyEvent } from "aws-lambda";
import { UploadFoodImageCommand } from "../../business/commands/UploadFoodImage/UploadFoodImageCommand";
import { BadRequestError } from "@snackupapp/shared";

export class UploadFoodImageRequest {
    static transform(event: APIGatewayProxyEvent): UploadFoodImageCommand {
        const raw: unknown = JSON.parse(event.body ?? "{}");

        if (typeof raw !== "object" || raw === null) throw new BadRequestError("Invalid request body");

        const body = raw as { contentType: string };

        return new UploadFoodImageCommand(
                body.contentType
        );
    }
}
