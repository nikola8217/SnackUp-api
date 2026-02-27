import { injectable } from 'tsyringe';
import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IStorage, PresignedUrlResult } from "../../business/ports/IStorage";

@injectable()
export class S3Storage implements IStorage {
    private s3Client: S3Client;
    private bucketName = process.env.FOOD_IMAGES_BUCKET!;

    constructor() {
        this.s3Client = new S3Client({});
    }

    async generateUploadUrl(key: string, contentType: string): Promise<PresignedUrlResult> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType
        });

        const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

        return {
            uploadUrl,
            fileUrl: `https://${this.bucketName}.s3.amazonaws.com/${key}`
        };
    }

    async moveFile(sourceKey: string, destinationKey: string): Promise<string> {
        await this.s3Client.send(new CopyObjectCommand({
            Bucket: this.bucketName,
            CopySource: `${this.bucketName}/${sourceKey}`,
            Key: destinationKey
        }));

        await this.s3Client.send(new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: sourceKey
        }));

        return `https://${this.bucketName}.s3.amazonaws.com/${destinationKey}`;
    }

    async deleteFile(key: string): Promise<void> {
        await this.s3Client.send(new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        }));
    }
}