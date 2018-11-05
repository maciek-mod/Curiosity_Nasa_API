import { combineReducers } from 'redux';
import { eventsReducer } from './eventsReducer';


const rootReducer = combineReducers({
    eventsStore: eventsReducer

});

export default rootReducer;
