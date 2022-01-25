import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { selectAllCategories } from '../categories/categoriesSlice';


// For use in Edit Task form to enable switching categories

// formik prop needed to access form related values from edit task  
// type is of the formik object specifically created inside edit task, but too complex to set type properly here
// since the obj is created at runtime (can't export type from inside a function)
function CategorySelect(props: { formik:any }) {
    const { formik } = props;
    const { touched } = formik;

    const categories = useAppSelector(selectAllCategories);
    const options = () => {
        return categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>);
        
    };

    return (
        <Row className="mb-3">
            <Form.Group>
                <Form.Label>Category:</Form.Label>
                    <Form.Select
                        {...formik.getFieldProps("categoryId")}
                        isValid= {touched.categoryId}
                    >   
                    
                    { options() }

                    </Form.Select>
                <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
        </Row>
    );
}

export default CategorySelect;