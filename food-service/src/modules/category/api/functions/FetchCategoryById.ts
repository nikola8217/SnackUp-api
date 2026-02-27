import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { mediator } from "../di/container";
import { FetchCategoryByIdRequest } from "../requests/FetchCategoryByIdRequest";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const query = FetchCategoryByIdRequest.transform(event);

    const category = await mediator.send(query);

    return { 
      statusCode: 200, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Category successfully fetched",
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