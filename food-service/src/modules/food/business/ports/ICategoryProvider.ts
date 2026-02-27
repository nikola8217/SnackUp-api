export interface ICategoryProvider {
    getCategoryById(id: string): Promise<{ id: string; categoryName: string }>;
    getAllCategories(): Promise<{ id: string; categoryName: string }[]>;
}