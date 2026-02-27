import { RequestData } from 'mediatr-ts';
import { FoodsByCategoryResponse } from '../../responses/FoodsByCategoryResponse';

export class FetchFoodsMenuQuery extends RequestData<FoodsByCategoryResponse[]> {
    constructor(public readonly categoryIds?: string[]) {
        super();
    }
}