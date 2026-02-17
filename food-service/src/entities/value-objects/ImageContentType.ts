import { BadRequestError } from "@snackupapp/shared";

export type AllowedContentType = "image/jpeg" | "image/jpg" | "image/png";

const EXTENSION_MAP: Record<AllowedContentType, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
};

export class ImageContentType {
    private constructor(public readonly value: AllowedContentType) {}

    static create(value: string): ImageContentType {
        if (!Object.keys(EXTENSION_MAP).includes(value)) {
            throw new BadRequestError("Invalid contentType. Allowed: image/jpeg, image/jpg, image/png");
        }
        return new ImageContentType(value as AllowedContentType);
    }

    get extension(): string {
        return EXTENSION_MAP[this.value];
    }
}