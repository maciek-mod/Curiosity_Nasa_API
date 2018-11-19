import React from 'react';

const Loading = (props) => {
    if (props.isLoading) {
        return(
            <div id="loader">
                <div className="loader">
                    <div className="loader__page"></div>
                    <div className="loader__page"></div>
                    <div className="loader__page"></div>
                </div>
            </div>
        )
    } else{
        return(
            <div>
                {props.children}
            </div>
        )
    }
};


export default Loading;
