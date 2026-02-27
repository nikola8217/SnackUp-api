import { injectable, inject } from 'tsyringe';
import { BadRequestError, NotFoundError } from "@snackupapp/shared";
import { ICategoryRepository } from "../../ports/ICategoryRepository";
import { UpdateCategoryCommand } from "./UpdateCategoryCommand";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { CategoryResponse } from "../../responses/CategoryResponse";

@injectable()
@requestHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements RequestHandler<UpdateCategoryCommand, CategoryResponse> {

    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) {}

    async handle(command: UpdateCategoryCommand): Promise<CategoryResponse> {

        const category = await this.categoryRepository.getCategoryById(command.id);

        if (!category) throw new NotFoundError("Category not found");
        
        if (category.categoryName !== command.categoryName) {
            const nameIsTaken = await this.categoryRepository.getCategoryByName(command.categoryName);

            if (nameIsTaken) throw new BadRequestError("Category name is already taken");
        }

        category.categoryName = command.categoryName;

        const updCategory = await this.categoryRepository.updateCategory(category);

        return {
            id: updCategory.id,
            categoryName: updCategory.categoryName
        }

    }
}