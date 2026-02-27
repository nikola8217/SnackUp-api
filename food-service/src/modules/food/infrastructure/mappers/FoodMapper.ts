import { Food } from "../../core/entities/Food";

export interface FoodDbItem {
    id: string;
    foodName: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export class FoodMapper {
    static toPersistence(food: Food): FoodDbItem {
        const now = new Date().toISOString();

        return {
            id: food.id,
            foodName: food.foodName,
            description: food.description,
            price: food.price,
            imageUrl: food.imageUrl,
            categoryId: food.categoryId,
            createdAt: now,
            updatedAt: now,
        };
    }

    static toDomain(item: FoodDbItem): Food {
        return new Food(
            item.id,
            item.foodName,
            item.description,
            item.price,
            item.imageUrl,
            item.categoryId
        );
    }
}
