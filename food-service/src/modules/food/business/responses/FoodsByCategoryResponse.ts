import { FoodResponse } from './FoodResponse';

export interface FoodsByCategoryResponse {
    categoryId: string;
    categoryName: string;
    foods: FoodResponse[];
}