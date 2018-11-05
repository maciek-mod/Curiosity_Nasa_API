import React from 'react';

const ErrorItem = (props) => {
    if (props.isError) {
        return <p>UPS</p>;
    } else {
        return null;
    }
};


export default ErrorItem;
