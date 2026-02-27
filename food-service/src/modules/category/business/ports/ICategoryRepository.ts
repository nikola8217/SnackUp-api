import { Category } from "../../core/entities/Category";

export interface ICategoryRepository {
    createCategory(user: Category): Promise<Category>;

    getCategoryByName(name: string): Promise<Category | null>;

    getCategoryById(id: string): Promise<Category | null>;

    getAllCategories(): Promise<Category[]>;

    updateCategory(category: Category): Promise<Category>;
    
    deleteCategory(id: string): Promise<void>;
}