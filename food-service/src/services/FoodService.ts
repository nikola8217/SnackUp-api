import { randomUUID } from "crypto";
import { IFoodRepository } from "./ports/IFoodRepository";
import { ICategoryRepository } from "./ports/ICategoryRepository";
import { CreateFoodDto } from "../dtos/CreateFoodDto";
import { Food } from "../entities/Food";
import { NotFoundError } from "@snackupapp/shared";

export class FoodService {
    constructor(
        private foodRepository: IFoodRepository,
        private categoryRepository: ICategoryRepository
    ) {}

    async createFood(dto: CreateFoodDto): Promise<Food> {
        const category = await this.categoryRepository.getCategoryById(dto.categoryId);

        if (!category) {
            throw new NotFoundError("Category does not exist");
        }

        const food = new Food(
            randomUUID(),
            dto.foodName,
            dto.description,
            dto.price,
            dto.imageUrl,
            dto.categoryId
        );

        return await this.foodRepository.createFood(food);
    }
}
