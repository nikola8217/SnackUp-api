import { RequestData } from 'mediatr-ts';

export class DeleteFoodCommand extends RequestData<void> {
    constructor(public readonly id: string) {
        super();
    }
}