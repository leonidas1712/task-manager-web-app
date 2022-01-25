import React, { useState } from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectTasksByCategory } from "../common/joinSelectors";
import { errorCategory, selectAllCategoryIds, selectCategoryById } from "./categoriesSlice";
import TasksList from  '../tasks/TasksList';
import AddTaskButton from "../tasks/AddTaskButton";
import RenameCategory from "./RenameCategory";
import DeleteCategory from "./DeleteCategory";
import { OPTION_NAMES, DEFAULT_OPTION } from "../tasks/taskSorter";
import { selectCategoryStatus } from "./categoriesSlice";
import { StandardSpin } from "../common/Spinners";
import useSortBy from "../common/useSortBy";
import { Loading } from "../../Constants";



// TODO: everytime I switch categories, it should make a network request to update all tasks
    // (or just the clicked category's tasks?)

// Display page for a category. If category does not exist, show corresponding message.
function CategoryPage() {
    const params = useParams(); 
    const id = Number(params.categoryId); // to check if the category exists
    const status = useAppSelector(selectCategoryStatus); // handle Loading status: spinner, error
    
    const categoryIds = useAppSelector(selectAllCategoryIds);
    
    const categoryTasks = useAppSelector(state => selectTasksByCategory(state, id));
    let category = useAppSelector((state) => selectCategoryById(state, id));

    const { sortOption, SortByButton } = useSortBy();

    category = category ? category : errorCategory();
    
    // if !includes is because of rejected, show the same message (sidebar will show error loading categories)
    if (!categoryIds.includes(id)) {
        switch(status) {
            case Loading.PENDING:
                return <StandardSpin />
            default:
                return (<div className="lead">Category does not exist</div>)
        }
    }

    // category page in charge of default msg
    const displayTasks = () => {
        if (categoryTasks.length == 0) {
            return <div className="lead"> No tasks in this category. Well done! </div>
        } 
        
        return <TasksList tasks={categoryTasks} sortBy={sortOption} showSearch />
    }

    return (
            <div className="category-page">
                <div className="d-flex align-items-center mb-2">
                    <h2 className="display-6 fs-2">{category.name}</h2>
                    <RenameCategory category={category}/>    
                    <DeleteCategory category={category} />                    
                    <SortByButton />
                </div>

                <hr className="mt-0 mb-3"></hr>

                <AddTaskButton categoryId={id} />
                <div className="mb-4"></div>
                { displayTasks() }
            
            </div>
    )
}

export default CategoryPage;