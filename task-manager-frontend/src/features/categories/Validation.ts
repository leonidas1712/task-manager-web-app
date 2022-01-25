import { Category } from "../../Types";
import * as yup from 'yup';
import { selectAllCategories } from './categoriesSlice';
import { useAppSelector } from "../../app/hooks";

// Custom hook to use yup with extra validation, so we can re-use it across components
// TypeScript typing does not work here 

export const isNewCategory = (name:string, categories:Category[]) => {
    return !(categories.map((cat) => cat.name).includes(name));
}

function categoryNames(categories:Category[]): string[] {
    return categories.map((cat) => cat.name);
} 

//https://stackoverflow.com/questions/60525429/how-to-write-a-custom-schema-validation-using-yup-addmethod-for-country-name-a
// custom yup object that can validate against category names
// can use in any place where yup is used so category specific yup object schema is defined below for use
export function useYup():any {
    const categories = useAppSelector(selectAllCategories);
    const names = categoryNames(categories);

    yup.addMethod(yup.string, 'isValidCategory', function() {
        // custom error message as second arg
        return this.notOneOf(names, "Category name must not already exist")
    })
    return yup;
}

// yup validation object specific to use for category validation (Add and Rename)
export function useCategoryYup() {
    const customYup = useYup();
    return customYup.object({
        name: customYup.string().required("Category name can't be blank").isValidCategory()
    });
}

// type of supplied values from Formik form - e.g might change if category has more props to update
// so it is different from final post object props specified by API Service
export type CategoryUpdateBody = {
    name: string
}