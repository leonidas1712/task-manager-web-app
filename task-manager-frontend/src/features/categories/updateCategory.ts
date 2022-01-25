// File to handle logic of taking category name, id from form and updating so 
// there is only one external method call 
import { Category } from "../../Types";
import { CategoryUpdateBody } from "./Validation";
import { CategoryPostObject } from '../../api/APIService';
import { editCategory } from '../categories/categoriesSlice';


export function updateCategoryArgsOf(category:Category, values: CategoryUpdateBody) {
    const params = { categoryId: category.id };
    const body = { name: values.name };
    return {
        params,
        body
    }
}
