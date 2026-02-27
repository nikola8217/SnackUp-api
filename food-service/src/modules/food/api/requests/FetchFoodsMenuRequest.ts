import { APIGatewayProxyEvent } from 'aws-lambda';
import { FetchFoodsMenuQuery } from '../../business/queries/FetchFoodsMenu/FetchFoodsMenuQuery';

export class FetchFoodsMenuRequest {
    static transform(event: APIGatewayProxyEvent): FetchFoodsMenuQuery {
        const categoryIds = event.queryStringParameters?.categoryIds?.split(',');

        return new FetchFoodsMenuQuery(categoryIds);
    }
}