import { RequestData } from "mediatr-ts";
import { CategoryResponse } from "../../responses/CategoryResponse";

export class FetchCategoriesQuery extends RequestData<CategoryResponse[]> {
    constructor() {
        super();
    }
}