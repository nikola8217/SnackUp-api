import { injectable, inject } from 'tsyringe';
import { NotFoundError } from "@snackupapp/shared";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { FetchFoodByIdQuery } from "./FetchFoodByIdQuery";
import { FoodResponse } from "../../responses/FoodResponse";
import { IFoodRepository } from "../../ports/IFoodRepository";
import { ICategoryProvider } from "../../ports/ICategoryProvider";
import { FoodResponseMapper } from "../../mappers/FoodResponseMapper";

@injectable()
@requestHandler(FetchFoodByIdQuery)
export class FetchFoodByIdHandler implements RequestHandler<FetchFoodByIdQuery, FoodResponse> {
    
    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('ICategoryProvider') private categoryProvider: ICategoryProvider
    ) {}

    async handle(query: FetchFoodByIdQuery): Promise<FoodResponse> {
        const food = await this.foodRepository.getFoodById(query.id);

        if (!food) throw new NotFoundError("Food not found");

        const category = await this.categoryProvider.getCategoryById(food.categoryId);

        return FoodResponseMapper.toResponse(food, category.categoryName);
    }
}