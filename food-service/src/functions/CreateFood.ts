import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateFoodRequest } from "../requests/CreateFoodRequest";
import { AppError } from "@snackupapp/shared";
import { foodService } from "../dependencies/services";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {

        const dto = CreateFoodRequest.toDto(event);

        const food = await foodService.createFood(dto);

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
