import { APIGatewayProxyEvent } from "aws-lambda";
import { FetchFoodByIdQuery } from "../../business/queries/FetchFoodById/FetchFoodByIdQuery";

export class FetchFoodByIdRequest {
    static transform(event: APIGatewayProxyEvent): FetchFoodByIdQuery {
        return new FetchFoodByIdQuery(
            event.pathParameters?.id as string,
        );
    }
}
