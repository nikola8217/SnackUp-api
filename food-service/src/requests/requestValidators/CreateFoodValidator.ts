import { RequiredFieldError, BadRequestError } from "@snackupapp/shared";

export class CreateFoodValidator {
    static validate(input: unknown): void {

        if (typeof input !== "object" || input === null) {
            throw new BadRequestError("Invalid request body");
        }

        const body = input as Record<string, unknown>;

        if (typeof body.foodName !== "string" || body.foodName.trim() === "") {
            throw new RequiredFieldError("Food name is required");
        }

        if (typeof body.description !== "string" || body.description.trim() === "") {
            throw new RequiredFieldError("Food description is required");
        }

        if (typeof body.price !== "number" || body.price <= 0) {
            throw new BadRequestError("Price must be greater than 0");
        }

        if (typeof body.imageUrl !== "string" || body.imageUrl.trim() === "") {
            throw new RequiredFieldError("Image URL is required");
        }

        if (typeof body.categoryId !== "string" || body.categoryId.trim() === "") {
            throw new RequiredFieldError("Category id is required");
        }
    }
}
