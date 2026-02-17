import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IStorageService, UploadFoodImageResult } from "../services/ports/IStorageService";

export class S3StorageService implements IStorageService {
    private s3 = new S3Client({ region: process.env.AWS_REGION });

    async generateUploadUrl(key: string, contentType: string): Promise<UploadFoodImageResult> {
        const command = new PutObjectCommand({
            Bucket: process.env.FOOD_IMAGES_BUCKET!,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });
        const fileUrl = `https://${process.env.FOOD_IMAGES_BUCKET}.s3.amazonaws.com/${key}`;

        return { uploadUrl, fileUrl };
    }
}