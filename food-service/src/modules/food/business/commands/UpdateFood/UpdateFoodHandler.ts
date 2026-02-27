import { injectable, inject } from 'tsyringe';
import { NotFoundError } from "@snackupapp/shared";
import { IFoodRepository } from "../../ports/IFoodRepository";
import { UpdateFoodCommand } from "./UpdateFoodCommand";
import { IStorage } from "../../ports/IStorage";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { FoodResponse } from "../../responses/FoodResponse";
import { ImageUtils } from "../../utils/ImageUtils";
import { FoodResponseMapper } from "../../mappers/FoodResponseMapper";
import { ICategoryProvider } from "../../ports/ICategoryProvider";

@injectable()
@requestHandler(UpdateFoodCommand)
export class UpdateFoodHandler implements RequestHandler<UpdateFoodCommand, FoodResponse> {

    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('ICategoryProvider') private categoryProvider: ICategoryProvider,
        @inject('IStorage') private storage: IStorage
    ) {}

    async handle(command: UpdateFoodCommand): Promise<FoodResponse> {

        const food = await this.foodRepository.getFoodById(command.id);

        if (!food) throw new NotFoundError("Food not found");

        const category = await this.categoryProvider.getCategoryById(command.categoryId);

        let finalImageUrl = food.imageUrl;

        if (command.imageUrl !== food.imageUrl) {
            const oldImageKey = ImageUtils.extractSourceKey(food.imageUrl);

            const sourceKey = ImageUtils.extractSourceKey(command.imageUrl);

            const destinationKey = ImageUtils.buildDestinationKey(food.id, command.imageUrl);

            await this.storage.deleteFile(oldImageKey);
            
            finalImageUrl = await this.storage.moveFile(sourceKey, destinationKey);
        }

        food.update(command.foodName, command.description, command.price, finalImageUrl, command.categoryId)

        const updFood = await this.foodRepository.updateFood(food);

        return FoodResponseMapper.toResponse(updFood, category.categoryName);

    }
}