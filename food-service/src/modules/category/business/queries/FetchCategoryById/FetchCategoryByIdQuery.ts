import { RequestData } from "mediatr-ts";
import { CategoryResponse } from "../../responses/CategoryResponse";

export class FetchCategoryByIdQuery extends RequestData<CategoryResponse> {
    constructor(public readonly id: string) {
        super();
    }
}