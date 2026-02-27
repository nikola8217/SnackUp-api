import { APIGatewayProxyEvent } from "aws-lambda";
import { FetchCategoriesQuery } from "../../business/queries/FetchCategories/FetchCategoriesQuery";

export class FetchCategoriesRequest {
    static transform(event: APIGatewayProxyEvent): FetchCategoriesQuery {
        return new FetchCategoriesQuery();
    }
}
