// Attempt to make sort by button re-usable
import React, { useState } from 'react';
import { OPTION_NAMES, DEFAULT_OPTION } from "../tasks/taskSorter";
import { DropdownButton, Dropdown } from 'react-bootstrap';

// Hook that returns sortOption as a string and sort by button component
// Could have separated button and state into separate functions, but sort by button is closely coupled with
// sort options due to the dropdown and default value, so it is easier to put them together.
function useSortBy(): { sortOption: string, SortByButton: () => JSX.Element} {
    const [sortOption, setSortOption] = useState(DEFAULT_OPTION || "Error");

    const dropDownOptions = () => {
        return OPTION_NAMES.map((name) => {
            return <Dropdown.Item key={name} eventKey={name}>{name}</Dropdown.Item>
        });
    }

    // to update sortOption state when a new option is selected. propagates to sortOption in parent component,
    // which would refresh the TasksList being used
    const optionSelectFn = (val:string | null) => {
        if (!val) {
            setSortOption(DEFAULT_OPTION || "Error");
            return;
        }

        setSortOption(val);
    }

    // marginleft: auto pushes completely to right in flexbox 
    const SortByButton = () =>
        (<DropdownButton 
            style={{marginLeft: "auto"}} 
            variant="info" 
            title={`Sort by: ${sortOption}`} 
            onSelect={optionSelectFn}
        >                   
            { dropDownOptions() }
        </DropdownButton>);

    
    return {
        sortOption,
        SortByButton
    }
}

export default useSortBy;