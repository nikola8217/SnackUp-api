import { injectable, inject } from 'tsyringe';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { NotFoundError } from '@snackupapp/shared';
import { IFoodRepository } from '../../ports/IFoodRepository';
import { ICategoryProvider } from '../../ports/ICategoryProvider';
import { FoodResponseMapper } from '../../mappers/FoodResponseMapper';
import { FetchFoodsByCategoryQuery } from './FetchFoodsByCategoryQuery';
import { FoodResponse } from '../../responses/FoodResponse';

@injectable()
@requestHandler(FetchFoodsByCategoryQuery)
export class FetchFoodsByCategoryHandler implements RequestHandler<FetchFoodsByCategoryQuery, FoodResponse[]> {

    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('ICategoryProvider') private categoryProvider: ICategoryProvider
    ) {}

    async handle(query: FetchFoodsByCategoryQuery): Promise<FoodResponse[]> {

        const [foods, category] = await Promise.all([
            this.foodRepository.getFoodsByCategoryId(query.categoryId),
            this.categoryProvider.getCategoryById(query.categoryId)
        ]);

        if (!category) throw new NotFoundError('Category not found');

        return foods.map(f => FoodResponseMapper.toResponse(f, category.categoryName));
        
    }
}