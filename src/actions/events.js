import * as constants from '../constants';
import fetch from 'isomorphic-fetch';


export function getEventsStart(){
    return{
        type: constants.EVENTS_GET_START,
    }
}

export function getEventsSuccess(data){
    return{
        type: constants.EVENTS_GET_SUCCESS,
        payload: {
            data
        }
    }
}

export function getEventsError(error){
    return{
        type: constants.EVENTS_GET_ERROR,
        payload: {
            error
        }
    }
}


export function getEvents(day){

    if (day === undefined) {
        day = '2018-11-13';
    }
    return (dispatch) => {
        dispatch(getEventsStart());
        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+ day +'&api_key=' + constants.API_KEY)
        .then(response => response.json())
        .then(data => dispatch(getEventsSuccess(
            data.photos
        )))
        .catch(error => dispatch(getEventsError(
            error: true
        )));
    };
}
