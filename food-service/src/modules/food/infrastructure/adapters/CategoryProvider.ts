import { inject, injectable } from 'tsyringe';
import { ICategoryProvider } from '../../business/ports/ICategoryProvider';
import { CategoryRepository } from '../../../category/infrastructure/repositories/CategoryRepository';
import { NotFoundError } from '@snackupapp/shared';
import { ICategoryRepository } from '../../../category/business/ports/ICategoryRepository';

@injectable()
export class CategoryProviderAdapter implements ICategoryProvider {
    constructor(
        @inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) {}
    
    async getCategoryById(id: string) {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new NotFoundError("Category not found");

        return { id: category.id, categoryName: category.categoryName };
    }

    async getAllCategories() {
        const categories = await this.categoryRepository.getAllCategories();

        return categories.map(c => ({ id: c.id, categoryName: c.categoryName }));
    }
}