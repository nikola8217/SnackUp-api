import { BadRequestError } from "@snackupapp/shared";

export class FoodValidator {

    static validateId(id: string) {
        if (!id || typeof id !== "string") {
            throw new BadRequestError("Invalid food id");
        }
    }

    static validateFoodName(name: string) {
        if (!name || name.trim().length === 0) {
            throw new BadRequestError("Food name is required");
        }
    }

    static validateDescription(description: string) {
        if (!description || description.trim().length === 0) {
            throw new BadRequestError("Food description is required");
        }
    }

    static validatePrice(price: number) {
        if (typeof price !== "number" || price <= 0) {
            throw new BadRequestError("Price must be greater than 0");
        }
    }

    static validateImageUrl(imageUrl: string) {
        if (!imageUrl || imageUrl.trim().length === 0) {
            throw new BadRequestError("Image URL is required");
        }
    }

    static validateCategoryId(categoryId: string) {
        if (!categoryId || typeof categoryId !== "string") {
            throw new BadRequestError("Category id is required");
        }
    }
}
