import { BadRequestError, NotFoundError } from "@snackupapp/shared";
import { randomUUID } from "crypto";
import { ICategoryRepository } from "./ports/ICategoryRepository";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { Category } from "../entities/Category";
import { UpdateCategoryDto } from "../dtos/UpdateCategoryDto";

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) {}

    async createCategory(dto: CreateCategoryDto): Promise<Category> {
        const nameIsTaken = await this.categoryRepository.getCategoryByName(dto.categoryName);

        if (nameIsTaken) throw new BadRequestError("Category name is already taken");

        const category = new Category(
            randomUUID(),
            dto.categoryName
        );

        return await this.categoryRepository.createCategory(category);
    }

    async fetchCategories(): Promise<Category[]> {
        return this.categoryRepository.getAllCategories();
    }

    async fetchCategoryById(id: string): Promise<Category> {
        return await this.checkCategory(id);
    }

    private async checkCategory(id: string): Promise<Category> {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new NotFoundError("Category not found");

        return category;
    }

    async updateCategory(dto: UpdateCategoryDto): Promise<Category> {
        const category = await this.checkCategory(dto.id);

        if (category.categoryName !== dto.categoryName) {
            const nameIsTaken = await this.categoryRepository.getCategoryByName(dto.categoryName);

            if (nameIsTaken) throw new BadRequestError("Category name is already taken");
        }

        category.categoryName = dto.categoryName;

        return await this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.checkCategory(id);

        await this.categoryRepository.deleteCategory(id);
    }
}