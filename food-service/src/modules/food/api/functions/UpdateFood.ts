import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { mediator } from "../di/container";
import { UpdateFoodRequest } from "../requests/UpdateFoodRequest";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const command = UpdateFoodRequest.transform(event);

    const food = await mediator.send(command);

    return { 
      statusCode: 200, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Food successfully updated",
        food 
      }) 
    };

  } catch (error) {
    console.log('ERROR: ', error);

    return {
      statusCode: error instanceof AppError ? error.statusCode : 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: error instanceof AppError ? error.message : "Internal server error" }),
    };
  }
};