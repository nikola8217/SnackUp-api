import { injectable, inject } from 'tsyringe';
import { ICategoryRepository } from '../../ports/ICategoryRepository';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { FetchCategoriesQuery } from "./FetchCategoriesQuery";
import { CategoryResponse } from '../../responses/CategoryResponse';

@injectable()
@requestHandler(FetchCategoriesQuery)
export class FetchCategoriesHandler implements RequestHandler<FetchCategoriesQuery, CategoryResponse[]> {
    
    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) {}

    async handle(): Promise<CategoryResponse[]> {

        const categories = await this.categoryRepository.getAllCategories();

        return categories.map(category => ({
            id: category.id,
            categoryName: category.categoryName
        }));
        
    }
}