import { injectable, inject } from 'tsyringe';
import { NotFoundError } from "@snackupapp/shared";
import { ICategoryRepository } from "../../ports/ICategoryRepository";
import { FetchCategoryByIdQuery } from "./FetchCategoryByIdQuery";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { CategoryResponse } from "../../responses/CategoryResponse";

@injectable()
@requestHandler(FetchCategoryByIdQuery)
export class FetchCategoryByIdHandler implements RequestHandler<FetchCategoryByIdQuery, CategoryResponse> {
    
    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) {}

    async handle(query: FetchCategoryByIdQuery): Promise<CategoryResponse> {

        const category = await this.categoryRepository.getCategoryById(query.id);

        if (!category) throw new NotFoundError("Category not found");

        return {
            id: category.id,
            categoryName: category.categoryName
        };
        
    }
}