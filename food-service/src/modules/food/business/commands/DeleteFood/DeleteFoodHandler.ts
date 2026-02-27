import { injectable, inject } from 'tsyringe';
import { NotFoundError } from "@snackupapp/shared";
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { DeleteFoodCommand } from "./DeleteFoodCommand";
import { IFoodRepository } from "../../ports/IFoodRepository";
import { IStorage } from "../../ports/IStorage";
import { ImageUtils } from "../../utils/ImageUtils";

@injectable()
@requestHandler(DeleteFoodCommand)
export class DeleteFoodHandler implements RequestHandler<DeleteFoodCommand, void> {

    constructor(
        @inject('IFoodRepository') private foodRepository: IFoodRepository,
        @inject('IStorage') private storage: IStorage
    ) {}

    async handle(command: DeleteFoodCommand): Promise<void> {
        const food = await this.foodRepository.getFoodById(command.id);
        if (!food) throw new NotFoundError("Food not found");

        const imageKey = ImageUtils.extractSourceKey(food.imageUrl);

        await this.foodRepository.deleteFood(food.id);

        await this.storage.deleteFile(imageKey);
    }
}