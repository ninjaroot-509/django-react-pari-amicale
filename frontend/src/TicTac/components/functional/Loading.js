import React from 'react';

const Loading = ({loading}) => {
    return (
        <div style={{display:loading?'flex':'none', maxWidth: '-webkit-fill-available', maxHeight: '-webkit-fill-available'}} className="wait">
             <div className="loader"></div>   
        </div>
    );
}

export default Loading;
