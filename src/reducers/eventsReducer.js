import * as constants from '../constants';

const initialState = {
    data: null,
    test: false,
    error: false,
    isError: false,
    isLoading: false
};

export function eventsReducer(state = initialState, action){
    switch (action.type) {
        case constants.EVENTS_GET_START:
            return {...state, isLoading: true};
        case constants.EVENTS_GET_SUCCESS:
            return {...initialState, isLoading: false, data: action.payload.data};
        case constants.EVENTS_GET_ERROR:
            return {...state, isLoading: false, isError: true, error: action.payload.error};
        default:
            return state;

    }
}
