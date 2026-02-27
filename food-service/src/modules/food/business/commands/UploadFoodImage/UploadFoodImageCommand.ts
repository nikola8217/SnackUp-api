import { RequestData } from "mediatr-ts";
import { PresignedUrlResult } from "../../ports/IStorage";

export class UploadFoodImageCommand extends RequestData<PresignedUrlResult> {
    constructor(public readonly contentType: string) {
        super();
    }
}