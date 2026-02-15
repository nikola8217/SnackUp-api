import { PayloadDto } from "../../dtos/PayloadDto";

export interface ITokenGenerator {
    generate(payload: PayloadDto): string;
}