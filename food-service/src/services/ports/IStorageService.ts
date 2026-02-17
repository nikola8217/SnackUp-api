export interface UploadFoodImageResult {
    uploadUrl: string;
    fileUrl: string;
}

export interface IStorageService {
    generateUploadUrl(key: string, contentType: string): Promise<UploadFoodImageResult>;
}