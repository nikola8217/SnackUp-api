import { RequiredFieldError, BadRequestError } from "@snackupapp/shared";

export class CreateCategoryValidator {
  static validate(input: unknown): void {
    if (typeof input !== "object" || input === null) {
      throw new BadRequestError("Invalid request body");
    }

    const body = input as Record<string, unknown>;

    if (typeof body.categoryName !== "string" || body.categoryName.trim() === "") {
      throw new RequiredFieldError("Category name is required");
    }
  }
}
