import { CategoryValidator } from '../../../core/validators/CategoryValidator';
import { RequestData } from 'mediatr-ts';
import { CategoryResponse } from '../../responses/CategoryResponse';

export class CreateCategoryCommand extends RequestData<CategoryResponse> {
    constructor(public readonly categoryName: string) {
        super();
        CategoryValidator.validateCategoryName(categoryName);
    }
}