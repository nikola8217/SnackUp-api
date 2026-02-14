import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => ({
  statusCode: 200,
  body: JSON.stringify({ message: "Hello Serverless YAML + TS!" }),
});