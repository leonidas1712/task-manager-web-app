import React from 'react';

// to wrap around any contents displayed outside sidebar (keep formatting consistent)
function PageWrapper(props:any) {
    return (
        <div className="w-75 px-3 py-3" style={{height:"100vh"}}>
            {props.children}
        </div>
    )
};

export default PageWrapper;