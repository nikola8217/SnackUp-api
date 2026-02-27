import { injectable, inject } from 'tsyringe';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { NotFoundError } from '@snackupapp/shared';
import { IFoodRepository } from '../../ports/IFoodRepository';
import { ICategoryProvider } from '../../ports/ICategoryProvider';
import { FoodResponseMapper } from '../../mappers/FoodResponseMapper';
import { FetchFoodsMenuQuery } from './FetchFoodsMenuQuery';
import { FoodsByCategoryResponse } from '../../responses/FoodsByCategoryResponse';
import { Food } from '../../../core/entities/Food';

@injectable()
@requestHandler(FetchFoodsMenuQuery)
export class FetchFoodsMenuHandler implements RequestHandler<FetchFoodsMenuQuery, FoodsByCategoryResponse[]> {

    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('ICategoryProvider') private categoryProvider: ICategoryProvider
    ) {}

    async handle(query: FetchFoodsMenuQuery): Promise<FoodsByCategoryResponse[]> {
        let foods: Food[];
        let categories: { id: string; categoryName: string }[];

        if (query.categoryIds && query.categoryIds.length > 0) {
            [foods, categories] = await Promise.all([
                Promise.all(query.categoryIds.map(id => this.foodRepository.getFoodsByCategoryId(id)))
                    .then(results => results.flat()),
                Promise.all(query.categoryIds.map(id => this.categoryProvider.getCategoryById(id)))
                    .then(results => results.filter((c): c is { id: string; categoryName: string } => c !== null))
            ]);

            if (categories.length === 0) throw new NotFoundError('No categories found');

        } else {
            [foods, categories] = await Promise.all([
                this.foodRepository.getAllFoods(),
                this.categoryProvider.getAllCategories()
            ]);
        }

        return categories
            .map(category => ({
                categoryId: category.id,
                categoryName: category.categoryName,
                foods: foods
                    .filter(f => f.categoryId === category.id)
                    .map(f => FoodResponseMapper.toResponse(f, category.categoryName))
            }))
            .filter(group => group.foods.length > 0);
    }
}