export class ImageUtils {
    static extractSourceKey(imageUrl: string): string {
        return new URL(imageUrl).pathname.slice(1);
    }

    static buildDestinationKey(foodId: string, imageUrl: string): string {
        const extension = imageUrl.split('.').pop();
        return `foods/${foodId}.${extension}`;
    }
}