import { FoodValidator } from "../validators/FoodValidator";

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
        this.validation(foodName, description, price, imageUrl, categoryId);
    }

    update(foodName: string, description: string, price: number, imageUrl: string, categoryId: string): void {
        this.validation(foodName, description, price, imageUrl, categoryId);
        
        this.foodName = foodName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
    }

    validation(foodName: string, description: string, price: number, imageUrl: string, categoryId: string) {
        FoodValidator.validateFoodName(foodName);
        FoodValidator.validateDescription(description);
        FoodValidator.validatePrice(price);
        FoodValidator.validateImageUrl(imageUrl);
        FoodValidator.validateCategoryId(categoryId);
    }
}
