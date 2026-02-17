import { BadRequestError } from "@snackupapp/shared";
import { randomUUID } from "crypto";
import { ICategoryRepository } from "./ports/ICategoryRepository";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { Category } from "../entities/Category";

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) {}

    async createCategory(dto: CreateCategoryDto): Promise<Category> {
        const nameIsTaken = await this.categoryRepository.getCategoryByName(dto.categoryName);

        if (nameIsTaken) throw new BadRequestError("Category name is already taken");

        const category = new Category(
            randomUUID(),
            dto.categoryName
        );

        const createdCategory = await this.categoryRepository.createCategory(category);

        return createdCategory;
    }
}