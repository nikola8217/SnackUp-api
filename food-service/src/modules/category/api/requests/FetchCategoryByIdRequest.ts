import { APIGatewayProxyEvent } from "aws-lambda";
import { FetchCategoryByIdQuery } from "../../business/queries/FetchCategoryById/FetchCategoryByIdQuery";

export class FetchCategoryByIdRequest {
    static transform(event: APIGatewayProxyEvent): FetchCategoryByIdQuery {
        return new FetchCategoryByIdQuery(
            event.pathParameters?.id as string,
        );
    }
}
