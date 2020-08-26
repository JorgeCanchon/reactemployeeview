import axios from 'axios';
import * as constants from '../utils/constants';

export const GetEmployees = async () => {
    let result = await axios.get(constants.ENDPOINTS.EMPLOYEE.GET_EMPLOYEE);
    let data = await result;
    return data;
}

export const GetBosses = async () => {
    let result = await axios.get(constants.ENDPOINTS.EMPLOYEE.GET_BOSSES);
    let data = await result;
    return data;
}