import { CategoryValidator } from "../validators/CategoryValidator";

export class Category {
    constructor(
        public id: string,
        public categoryName: string,
    ) {
        CategoryValidator.validateId(id);
        CategoryValidator.validateCategoryName(categoryName);
    }
}