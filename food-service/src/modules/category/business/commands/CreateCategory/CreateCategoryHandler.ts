import { injectable, inject } from 'tsyringe';
import { BadRequestError } from "@snackupapp/shared";
import { Category } from "../../../core/entities/Category";
import { ICategoryRepository } from "../../ports/ICategoryRepository";
import { CreateCategoryCommand } from "./CreateCategoryCommand";
import { randomUUID } from "crypto";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { CategoryResponse } from "../../responses/CategoryResponse";

@injectable()
@requestHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements RequestHandler<CreateCategoryCommand, CategoryResponse> {

    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) {}

    async handle(command: CreateCategoryCommand): Promise<CategoryResponse> {

        const nameIsTaken = await this.categoryRepository.getCategoryByName(command.categoryName);
        
        if (nameIsTaken) throw new BadRequestError("Category name is already taken");

        const category = new Category(
            randomUUID(),
            command.categoryName
        );

        const newCategory = await this.categoryRepository.createCategory(category);

        return {
            id: newCategory.id,
            categoryName: newCategory.categoryName
        }
        
    }
}