import 'reflect-metadata';
import { container } from 'tsyringe';
import { Mediator } from 'mediatr-ts';

import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository';
import { FoodRepository } from '../../../food/infrastructure/repositories/FoodRepository';
import { FoodProvider } from '../../infrastructure/adapters/FoodProvider';

import '../../business/commands/CreateCategory/CreateCategoryHandler';
import '../../business/commands/DeleteCategory/DeleteCategoryHandler';
import '../../business/commands/UpdateCategory/UpdateCategoryHandler';
import '../../business/queries/FetchCategories/FetchCategoriesHandler';
import '../../business/queries/FetchCategoryById/FetchCategoryByIdHandler';

container.register('ICategoryRepository', { useClass: CategoryRepository });
container.register('IFoodRepository', { useClass: FoodRepository });
container.register('IFoodProvider', { useClass: FoodProvider });

export const mediator = new Mediator({
    resolver: {
        resolve<T>(constructor: new (...args: any[]) => T): T {
            return container.resolve(constructor);
        },
        add() {}
    }
});
