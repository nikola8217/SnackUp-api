import { RequiredFieldError } from "@snackupapp/shared";

export class CategoryValidator {
    static validateId(id: string): void {
        if (!id) throw new RequiredFieldError("Id is required");
    }
    
    static validateCategoryName(categoryName: string): void {
        if (!categoryName) throw new RequiredFieldError("Category name is required");
    }
}