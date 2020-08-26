import { combineReducers } from 'redux';
import reducerEmployee  from './employee/index';

export const allReducers = combineReducers({
    employee: reducerEmployee
});

export default allReducers;