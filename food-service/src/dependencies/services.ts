import { S3StorageService } from "../libs/S3StorageService";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { FoodRepository } from "../repositories/FoodRepository";
import { CategoryService } from "../services/CategoryService";
import { FoodImageService } from "../services/FoodImageService";
import { FoodService } from "../services/FoodService";

const categoryRepository = new CategoryRepository();
const foodRepository = new FoodRepository();
const storageService = new S3StorageService();

export const categoryService = new CategoryService(categoryRepository);

export const foodService = new FoodService(foodRepository, categoryRepository);

export const foodImageService = new FoodImageService(storageService);
