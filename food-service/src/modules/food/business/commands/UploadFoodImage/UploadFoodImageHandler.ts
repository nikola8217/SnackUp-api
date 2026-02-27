import { injectable, inject } from 'tsyringe';
import { randomUUID } from "crypto";
import { ImageContentType } from "../../../core/value-objects/ImageContentType";
import { IStorage, PresignedUrlResult } from "../../ports/IStorage";
import { UploadFoodImageCommand } from "./UploadFoodImageCommand";
import { RequestHandler, requestHandler } from 'mediatr-ts';

@injectable()
@requestHandler(UploadFoodImageCommand)
export class UploadFoodImageHandler implements RequestHandler<UploadFoodImageCommand, PresignedUrlResult> {

    constructor(
        @inject('IStorage') private storage: IStorage
    ) {}

    async handle(command: UploadFoodImageCommand): Promise<PresignedUrlResult> {
        const contentType = ImageContentType.create(command.contentType);
        
        const key = `foods/temp/${randomUUID()}.${contentType.extension}`;

        return this.storage.generateUploadUrl(key, contentType.value);
    }
}