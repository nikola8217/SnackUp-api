import 'reflect-metadata';
import { container } from 'tsyringe';
import { Mediator } from 'mediatr-ts';

import { FoodRepository } from '../../infrastructure/repositories/FoodRepository';
import { S3Storage } from '../../infrastructure/adapters/S3Storage';
import { CategoryRepository } from '../../../category/infrastructure/repositories/CategoryRepository';
import { CategoryProviderAdapter } from '../../infrastructure/adapters/CategoryProvider';

import '../../business/commands/CreateFood/CreateFoodHandler';
import '../../business/commands/DeleteFood/DeleteFoodHandler';
import '../../business/commands/UpdateFood/UpdateFoodHandler';
import '../../business/commands/UploadFoodImage/UploadFoodImageHandler';
import '../../business/queries/FetchFoodById/FetchFoodByIdHandler';
import '../../business/queries/FetchFoodsMenu/FetchFoodsMenuHandler';
import '../../business/queries/FetchFoodsByCategory/FetchFoodsByCategoryHandler';

container.register('IFoodRepository', { useClass: FoodRepository });
container.register('IStorage', { useClass: S3Storage });
container.register('ICategoryRepository', { useClass: CategoryRepository });
container.register('ICategoryProvider', { useClass: CategoryProviderAdapter });

export const mediator = new Mediator({
    resolver: {
        resolve<T>(constructor: new (...args: any[]) => T): T {
            return container.resolve(constructor);
        },
        add() {}
    }
});

