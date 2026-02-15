import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterUserRequest } from "../requests/RegisterUserRequest";
import { AppError } from "@snackupapp/shared";
import { userService } from "../factories/UserServiceFactory";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const dto = RegisterUserRequest.toDto(event);

    const user = await userService.registerUser(dto);

    return { 
      statusCode: 201, 
      body: JSON.stringify({
        headers: { "Content-Type": "application/json" },
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