import { injectable, inject } from 'tsyringe';
import { NotFoundError } from "@snackupapp/shared";
import { DeleteCategoryCommand } from "./DeleteCategoryCommand";
import { ICategoryRepository } from "../../ports/ICategoryRepository";
import { IFoodProvider } from '../../ports/IFoodProvider';
import { RequestHandler, requestHandler } from 'mediatr-ts';

@injectable()
@requestHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements RequestHandler<DeleteCategoryCommand, void> {

    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
        @inject('IFoodProvider') private foodProvider: IFoodProvider
    ) {}

    async handle(command: DeleteCategoryCommand): Promise<void> {

        const category = await this.categoryRepository.getCategoryById(command.id);
        
        if (!category) throw new NotFoundError("Category not found");

        await this.foodProvider.deleteFoodsByCategoryId(category.id);

        await this.categoryRepository.deleteCategory(category.id);
        
    }
}