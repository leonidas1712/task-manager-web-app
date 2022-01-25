import React from 'react';

{/* When there is overflow this keeps content from touching page edge */}

function Spacer() {
    return (
        <div className="mb-3" style={{visibility:"hidden"}}>Spacer</div>
    )
}

export default Spacer;