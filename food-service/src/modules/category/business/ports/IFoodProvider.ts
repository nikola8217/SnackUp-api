export interface IFoodProvider {
    deleteFoodsByCategoryId(categoryId: string): Promise<void>;
}