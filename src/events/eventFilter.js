import React from 'react';
import PropTypes from 'prop-types';


const EvenFilter = (props) => {
    return(
        <form>
            <input id="date" type="date"></input>
            <input type="submit" value="Submit" onClick={props.goDate}></input>
            <p id="error"></p>
        </form>
    );
};

EvenFilter.propTypes = {
    // filter: PropTypes.string.isRequired,
    goDate: PropTypes.func.isRequired

};

export default EvenFilter;
