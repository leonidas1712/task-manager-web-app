import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

// since TextField handles the text value and updating in display, we only need to
// pass in a function that handles what to do when value changes
    // But useState<string> is still necc. in component using search bar because the value
    // needs to update task selector everytime text field changes. Otherwise there is no (?)
    // way to ensure parent component list refreshes the filtered tasks
function SearchBar(props: { handleSearchValue: Function }) {
    return (
        <TextField 
                    variant="standard" 
                    onChange={(e) => props.handleSearchValue(e.target.value)}
                    placeholder="Search for a task"
                    // MUI search icon and text field look nicer
                    InputProps = {{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
    )
}
export default SearchBar;