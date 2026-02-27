export interface PresignedUrlResult {
    uploadUrl: string;
    fileUrl: string;
}

export interface IStorage {
    generateUploadUrl(key: string, contentType: string): Promise<PresignedUrlResult>;

    moveFile(sourceKey: string, destinationKey: string): Promise<string>;

    deleteFile(key: string): Promise<void>;
}