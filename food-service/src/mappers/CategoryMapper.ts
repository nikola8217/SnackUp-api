import { Category } from "../entities/Category";

export interface CategoryDbItem {
    id: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

export class CategoryMapper {
    static toPersistence(category: Category): CategoryDbItem {
        const now = new Date().toISOString();

        return {
            id: category.id,
            categoryName: category.categoryName,
            createdAt: now,
            updatedAt: now,
        };
    }

    static toDomain(item: CategoryDbItem): Category {
        return new Category(
            item.id,
            item.categoryName
        );
    }
}
