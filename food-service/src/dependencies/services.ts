import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryService } from "../services/CategoryService";

const categoryRepository = new CategoryRepository();

export const categoryService = new CategoryService(categoryRepository);
