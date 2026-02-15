import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { authService } from "../dependencies/services";
import { LoginUserRequest } from "../requests/LoginUserRequest";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const dto = LoginUserRequest.toDto(event);

    const user = await authService.loginUser(dto);

    return { 
      statusCode: 200, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "User successfully logged in",
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