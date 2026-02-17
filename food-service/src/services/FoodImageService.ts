import { randomUUID } from "crypto";
import { IStorageService } from "./ports/IStorageService";
import { UploadFoodImageDto } from "../dtos/UploadFoodImageDto";
import { ImageContentType } from "../entities/value-objects/ImageContentType";

export class FoodImageService {
    constructor(
        private storageService: IStorageService
    ) {}

    async uploadFoodImage(dto: UploadFoodImageDto) {
        const contentType = ImageContentType.create(dto.contentType);

        const key = dto.foodId
            ? `foods/${dto.foodId}.${contentType.extension}`
            : `foods/${randomUUID()}.${contentType.extension}`;

        return this.storageService.generateUploadUrl(key, contentType.value);
    }
}
