import { injectable, inject } from 'tsyringe';
import { Food } from "../../../core/entities/Food";
import { IFoodRepository } from "../../ports/IFoodRepository";
import { CreateFoodCommand } from "./CreateFoodCommand";
import { IStorage } from "../../ports/IStorage";
import { randomUUID } from "crypto";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { FoodResponse } from "../../responses/FoodResponse";
import { ImageUtils } from "../../utils/ImageUtils";
import { FoodResponseMapper } from "../../mappers/FoodResponseMapper";
import { ICategoryProvider } from "../../ports/ICategoryProvider";

@injectable()
@requestHandler(CreateFoodCommand)
export class CreateFoodHandler implements RequestHandler<CreateFoodCommand, FoodResponse> {

    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('ICategoryProvider') private categoryProvider: ICategoryProvider,
        @inject('IStorage') private storage: IStorage
    ) {}

    async handle(command: CreateFoodCommand): Promise<FoodResponse> {

        const category = await this.categoryProvider.getCategoryById(command.categoryId);

        const foodId = randomUUID();

        const sourceKey = ImageUtils.extractSourceKey(command.imageUrl);

        const destinationKey = ImageUtils.buildDestinationKey(foodId, command.imageUrl);

        const finalImageUrl = await this.storage.moveFile(sourceKey, destinationKey);

        const food = new Food(
            foodId,
            command.foodName,
            command.description,
            command.price,
            finalImageUrl,
            command.categoryId
        );

        const newFood = await this.foodRepository.createFood(food);

        return FoodResponseMapper.toResponse(newFood, category.categoryName);

    }
}