import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterUserRequest } from "../requests/RegisterUserRequest";
import { AppError } from "@snackupapp/shared";
import { mediator } from "../di/container";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const command = RegisterUserRequest.transform(event);

    const user = await mediator.send(command);

    return { 
      statusCode: 201, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "User successfully registered",
        user 
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