import React from "react";
import { sidebarWidth } from "../../Constants";
import "./Sidebar.css";

import CategoryNavigation from "../categories/CategoryNavigation";


// TODO: make sidebar responsive for smaller screen widths,
// Presentational component for sidebar contents, currently only CategoryNavigation
function Sidebar() {
    return (
        <div className="sidebar pt-2" style={{width: sidebarWidth}}> 
            <h3 className="text-center mt-2">Task Manager</h3>
            <div className="mt-3"></div>    
            <CategoryNavigation />
        </div>
    )
}

export default Sidebar;