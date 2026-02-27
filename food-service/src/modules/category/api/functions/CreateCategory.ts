import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateCategoryRequest } from "../requests/CreateCategoryRequest";
import { AppError } from "@snackupapp/shared";
import { mediator } from "../di/container";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const command = CreateCategoryRequest.transform(event);

    const category = await mediator.send(command);

    return { 
      statusCode: 201, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Category successfully created",
        category 
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