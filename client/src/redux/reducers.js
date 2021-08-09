import {combineReducers} from 'redux';
import {loadReducer} from "./load/";

export default combineReducers(
    {
        loadReducer,
    }
);