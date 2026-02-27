import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateFoodRequest } from "../requests/CreateFoodRequest";
import { AppError } from "@snackupapp/shared";
import { mediator } from "../di/container";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const command = CreateFoodRequest.transform(event);

        const food = await mediator.send(command);

        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Food successfully created",
                food
            })
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
