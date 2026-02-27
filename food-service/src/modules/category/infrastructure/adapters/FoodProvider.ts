import { injectable, inject } from 'tsyringe';
import { IFoodProvider } from '../../business/ports/IFoodProvider';
import { IFoodRepository } from '../../../food/business/ports/IFoodRepository';

@injectable()
export class FoodProvider implements IFoodProvider {
    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository
    ) {}

    async deleteFoodsByCategoryId(categoryId: string): Promise<void> {
        const foods = await this.foodRepository.getFoodsByCategoryId(categoryId);
        
        await Promise.all(foods.map(food => this.foodRepository.deleteFood(food.id)));
    }
}