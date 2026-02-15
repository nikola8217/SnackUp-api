import { RequiredFieldError, BadRequestError, InvalidEmailError } from "@snackupapp/shared";
import { Role } from "../../entities/enums/Role";

export class RegisterUserValidator {
  static validate(input: unknown): void {
    if (typeof input !== "object" || input === null) {
      throw new BadRequestError("Invalid request body");
    }

    const body = input as Record<string, unknown>;

    if (typeof body.name !== "string" || body.name.trim() === "") {
      throw new RequiredFieldError("Name is required");
    }

    if (typeof body.email !== "string") {
      throw new RequiredFieldError("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw new InvalidEmailError();
    }

    if (typeof body.password !== "string") {
      throw new RequiredFieldError("Password is required");
    }

    if (body.password.length < 8) {
      throw new BadRequestError("Password must be at least 8 characters long");
    }

    if (
      body.role !== undefined &&
      !Object.values(Role).includes(body.role as Role)
    ) {
      throw new BadRequestError("Invalid role");
    }
  }
}
