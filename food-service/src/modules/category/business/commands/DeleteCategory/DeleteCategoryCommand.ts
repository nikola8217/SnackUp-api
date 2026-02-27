import { RequestData } from 'mediatr-ts';

export class DeleteCategoryCommand extends RequestData<void> {
    constructor(public readonly id: string) {
        super();
    }
}