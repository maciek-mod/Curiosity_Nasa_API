import React from 'react';
import PropTypes from 'prop-types';


const EvenFilter = (props) => {
    console.log(props.anotherDay);
    return(
        <form>
            <input id="date" type="date"></input>
            <input type="submit" value="Submit" onClick={props.goDate}></input>
            <p id="error"> { props.anotherDay ? "Choose another day" : "" }
            </p>
        </form>
    );
};

EvenFilter.propTypes = {
    // filter: PropTypes.string.isRequired,
    goDate: PropTypes.func.isRequired,
    anotherDay: PropTypes.bool

};

export default EvenFilter;
