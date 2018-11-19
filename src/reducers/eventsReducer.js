import * as constants from '../constants';

const initialState = {
    data: null,
    test: false,
    error: false,
    isError: false,
    isLoading: true
};

export function eventsReducer(state = initialState, action){
    switch (action.type) {
        case constants.EVENTS_GET_START:
            return {...state, isLoading: true};
        case constants.EVENTS_GET_SUCCESS:
            return {...initialState, data: action.payload.data, isLoading: false};
        case constants.EVENTS_GET_ERROR:
            return {...state, isLoading: false, isError: true, error: action.payload.error};
        default:
            return state;

    }
}
