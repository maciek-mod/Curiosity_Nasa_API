import React from 'react';
import PropTypes from 'prop-types';


const EvenFilter = (props) => {
    return(
      <div className="form">
      <h1>Choose a date</h1>
        <form>
            <input id="date" type="date"></input>
            <input type="submit" value="Submit" onClick={props.goDate}></input>
            <p id="error"></p>
        </form>
      </div>
    );
};

EvenFilter.propTypes = {
    goDate: PropTypes.func.isRequired

};

export default EvenFilter;
