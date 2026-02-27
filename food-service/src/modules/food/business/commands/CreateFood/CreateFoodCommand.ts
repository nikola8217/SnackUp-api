import { FoodValidator } from '../../../core/validators/FoodValidator';
import { RequestData } from 'mediatr-ts';
import { FoodResponse } from "../../responses/FoodResponse";

export class CreateFoodCommand extends RequestData<FoodResponse> {
    constructor(
        public readonly foodName: string,
        public readonly description: string,
        public readonly price: number,
        public readonly imageUrl: string,
        public readonly categoryId: string
    ) {
        super();
        FoodValidator.validateFoodName(foodName);
        FoodValidator.validateDescription(description);
        FoodValidator.validatePrice(price);
        FoodValidator.validateImageUrl(imageUrl);
        FoodValidator.validateCategoryId(categoryId);
    }
}