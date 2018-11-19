import React from 'react';
import PropTypes from 'prop-types';


const EvenItem = (props) => {
    return(
        <div className="photo_box">
            <p>{props.cameraName}</p>
            <img onClick={props.showFull} src={props.srcImg} alt={props.altImg}/>
        </div>
    );
};

EvenItem.propTypes = {
    cameraName: PropTypes.string.isRequired,
    srcImg: PropTypes.string.isRequired,
    altImg: PropTypes.string.isRequired,
    showFull: PropTypes.func.isRequired
};

export default EvenItem;
