import { RequestData } from "mediatr-ts";
import { FoodResponse } from "../../responses/FoodResponse";

export class FetchFoodByIdQuery extends RequestData<FoodResponse> {
    constructor(public readonly id: string) {
        super();
    }
}