import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { UploadFoodImageRequest } from "../requests/UploadFoodImageRequest";
import { foodImageService } from "../dependencies/services";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const dto = UploadFoodImageRequest.toDto(event);

        const result = await foodImageService.uploadFoodImage(dto);

        return { 
            statusCode: 200, 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result) 
        };
    } catch (error) {
        console.log('ERROR: ', error);
        
        return {
            statusCode: error instanceof AppError ? error.statusCode : 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: error instanceof AppError ? error.message : "Internal server error"
            })
        };
    }
};