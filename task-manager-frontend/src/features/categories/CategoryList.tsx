import React, {useState, useEffect} from "react";
import { ListGroup, Nav, Navbar, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Loading } from "../../Constants";
import { Category } from "../../Types";
import { ALL_TASKS_PATH, UPCOMING_PATH, usePageId } from "../../urlHelper";
import { StandardSpin } from "../common/Spinners";
import AllTasks from "../tasks/AllTasks";
import { selectCategoryStatus } from "./categoriesSlice";

// CategoryList for use in navigation in sidebar only 

interface CategoryNavProps {
    name: string; 
    route: string;
}

// To show one navigation element corresponding to a category or page
function CategoryNav(props: CategoryNavProps) {
    const pageId = usePageId();

    // used to ensure styling is set correctly, no matter how I navigate to the category (based on pageId)
    const isActive = () => {
        return pageId == props.route;
    };

    return (
        <div className="d-inline-flex align-items-center justify-content-between">
            <Nav.Item style={{width:"100%"}} > 
                <Nav.Link active= {isActive()} eventKey={props.route} className="text-white">
                    {props.name}
                </Nav.Link>
                
            </Nav.Item>  

        </div>
    )
}


// Navs that are not dynamically generated, re-use CategoryNav for it since it is same but curried
function UpcomingNav() {
    return <CategoryNav name="Upcoming" route={UPCOMING_PATH}/>;
}

function AllTasksNav() {
    return <CategoryNav name="All tasks" route={ALL_TASKS_PATH} />;
}

interface CategoryListProps {
    categories: Category[];
}


// Consists of CategoryNav each with name and a route that corresponds to last part of url path
// TODO: Consider static navs (All tasks, upcoming) as "category navs", so they can work with the same Nav onSelect fn
// but in the future may want to move into separate file
function CategoryList(props: CategoryListProps) {
   const { categories } = props; 
   const categoryStatus = useAppSelector(selectCategoryStatus);

   const categoryToNav = ({ name, id }:Category) => {
       return <CategoryNav name={name} route={id+""} key={id}/>
   };

   const categoryList = () => {
       const fulfilledCase = () => {
           return categories.length == 0 ? <p className="text-muted text-start mx-3">No categories</p> :
               categories.map(categoryToNav);  
       }

       // pending: show spinner. fulfilled: either no categories or display as normal. error: error msg
        switch(categoryStatus) {
            case Loading.PENDING:
                return <StandardSpin/>;
            case Loading.REJECTED:
                return <p className="text-danger mx-3"> Error loading categories</p>  
            case Loading.FULFILLED:
            case Loading.IDLE: 
                return fulfilledCase();
                           
        }
    }

    return (
        <>
            <AllTasksNav />
            <UpcomingNav />
            <hr className="mt-0"></hr>
            {categoryList()}
        </>
       ); 
   }


export default CategoryList;