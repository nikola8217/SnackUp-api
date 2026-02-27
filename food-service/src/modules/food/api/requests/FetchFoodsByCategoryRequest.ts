import { APIGatewayProxyEvent } from 'aws-lambda';
import { BadRequestError } from '@snackupapp/shared';
import { FetchFoodsByCategoryQuery } from '../../business/queries/FetchFoodsByCategory/FetchFoodsByCategoryQuery';

export class FetchFoodsByCategoryRequest {
    static transform(event: APIGatewayProxyEvent): FetchFoodsByCategoryQuery {
        const categoryId = event.pathParameters?.categoryId as string;

        return new FetchFoodsByCategoryQuery(categoryId);
    }
}