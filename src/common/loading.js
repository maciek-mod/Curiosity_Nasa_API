import React from 'react';

const Loading = (props) => {
    if (props.isLoading) {
        return (
            <div className="loading_container">
                <div className="pokeball">
                    <div className="pokeball__button"></div>
                </div>
            </div>
        );
    } else {
        return props.children;
    }
};


export default Loading;
