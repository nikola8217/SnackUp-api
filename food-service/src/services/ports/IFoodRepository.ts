import { Food } from "../../entities/Food";

export interface IFoodRepository {
    createFood(food: Food): Promise<Food>;
}
