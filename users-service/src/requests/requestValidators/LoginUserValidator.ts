import { RequiredFieldError, BadRequestError } from "@snackupapp/shared";

export class LoginUserValidator {
  static validate(input: unknown): void {
    if (typeof input !== "object" || input === null) {
      throw new BadRequestError("Invalid request body");
    }

    const body = input as Record<string, unknown>;

    if (typeof body.email !== "string") {
      throw new RequiredFieldError("Email is required");
    }

    if (typeof body.password !== "string") {
      throw new RequiredFieldError("Password is required");
    }
  }
}
