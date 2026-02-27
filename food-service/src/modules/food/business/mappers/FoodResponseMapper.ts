import { Food } from '../../core/entities/Food';
import { FoodResponse } from '../responses/FoodResponse';

export class FoodResponseMapper {
    static toResponse(food: Food, categoryName: string): FoodResponse {
        return {
            id: food.id,
            foodName: food.foodName,
            description: food.description,
            price: food.price,
            imageUrl: food.imageUrl,
            categoryId: food.categoryId,
            categoryName
        }
    }
}