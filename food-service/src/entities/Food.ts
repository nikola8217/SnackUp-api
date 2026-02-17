import { FoodValidator } from "./validators/FoodValidator";

export class Food {
    constructor(
        public id: string,
        public foodName: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public categoryId: string
    ) {
        FoodValidator.validateId(id);
        FoodValidator.validateFoodName(foodName);
        FoodValidator.validateDescription(description);
        FoodValidator.validatePrice(price);
        FoodValidator.validateImageUrl(imageUrl);
        FoodValidator.validateCategoryId(categoryId);
    }
}
