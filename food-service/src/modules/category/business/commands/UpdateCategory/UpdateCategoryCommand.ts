import { CategoryValidator } from '../../../core/validators/CategoryValidator';
import { RequestData } from 'mediatr-ts';
import { CategoryResponse } from '../../responses/CategoryResponse';

export class UpdateCategoryCommand extends RequestData<CategoryResponse> {
    constructor(public readonly id: string, public readonly categoryName: string) {
        super();
        CategoryValidator.validateCategoryName(categoryName);
    }
}