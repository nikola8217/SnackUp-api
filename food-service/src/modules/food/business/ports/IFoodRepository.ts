import { Food } from "../../core/entities/Food";

export interface IFoodRepository {
    createFood(food: Food): Promise<Food>;

    getAllFoods(): Promise<Food[]>;
    
    getFoodsByCategoryId(categoryId: string): Promise<Food[]>;

    getFoodById(id: string): Promise<Food | null>;

    updateFood(food: Food): Promise<Food>;

    deleteFood(id: string): Promise<void>;
}
