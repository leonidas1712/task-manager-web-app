import React from "react";
import {  Nav } from "react-bootstrap";
import CategoryList from "./CategoryList";
import { useNavigateHelper } from "../../urlHelper";
import { useAppSelector } from "../../app/hooks";
import { selectAllCategories } from "./categoriesSlice";
import AddCategory from "./AddCategory";
import Spacer from "../../Spacer";

// Wrapper around entire Nav tree (including All tasks, Upcoming)
export default function CategoryNavigation() {
    const navigate = useNavigateHelper();
    const allCategories = useAppSelector(selectAllCategories);
    return (
        <>
            <Nav 
                variant="pills" 
                // when a nav elem. is selected, fires onSelect with route, passes to navigate
                // which navigates to a page or a specific category based on the key
                onSelect={(key) => { navigate(key)} }
                className="flex-column px-2" 
                >
                    

                <CategoryList categories={allCategories} />
            </Nav>

            <AddCategory />
            <Spacer />
        </>
    )
}

