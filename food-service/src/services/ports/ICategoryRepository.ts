import { Category } from "../../entities/Category";

export interface ICategoryRepository {
    createCategory(user: Category): Promise<Category>;

    getCategoryByName(name: string): Promise<Category | null>;

    getAllCategories(): Promise<Category[]>;

    getCategoryById(id: string): Promise<Category | null>;
}