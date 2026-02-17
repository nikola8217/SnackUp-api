import { APIGatewayProxyHandler } from "aws-lambda";
import { AppError } from "@snackupapp/shared";
import { categoryService } from "../dependencies/services";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    await categoryService.deleteCategory(event.pathParameters?.id as string);

    return { 
      statusCode: 200, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Category successfully deleted"
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