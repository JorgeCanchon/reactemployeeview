import { combineReducers } from 'redux';
import reducerEmployee  from './employee/index';

export const allReducers = combineReducers({
    employees: reducerEmployee
});

export default allReducers;