import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { UploadFoodImageRequest } from "../requests/UploadFoodImageRequest";
import { mediator } from "../di/container";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const command = UploadFoodImageRequest.transform(event);

        const result = await mediator.send(command);

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