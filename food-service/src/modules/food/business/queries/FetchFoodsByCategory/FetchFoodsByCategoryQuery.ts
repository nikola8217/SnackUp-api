import { RequestData } from 'mediatr-ts';
import { FoodResponse } from '../../responses/FoodResponse';
import { FoodValidator } from '../../../core/validators/FoodValidator';

export class FetchFoodsByCategoryQuery extends RequestData<FoodResponse[]> {
    constructor(public readonly categoryId: string) {
        super();
        FoodValidator.validateCategoryId(categoryId);
    }
}