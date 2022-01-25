import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCategoryById } from '../categories/categoriesSlice';
import { Link } from 'react-router-dom';
import { CATEGORIES_PATH } from '../../urlHelper';

// For use in TaskCard to display link to Category when outside CategoryPage
function CategoryLink({ id }: { id:number }) {
    const category = useAppSelector(state => selectCategoryById(state, id));

    const msg = category ? category.name : "Unknown";
    
    return (
        <p className="d-inline text-end mx-3"><Link to = {`/${CATEGORIES_PATH}/${id}`} >Category: {msg}</Link></p>
     );
}

export default CategoryLink;