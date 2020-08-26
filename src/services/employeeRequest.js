import axios from 'axios';
import * as constants from '../utils/constants';

export const GetEmployees = async () => {
    try{
        let result = await axios.get(constants.ENDPOINTS.EMPLOYEE.GET_EMPLOYEE);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const GetAll = async () => {
    try{
        let result = await axios.get(constants.ENDPOINTS.EMPLOYEE.GetAll);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const GetBosses = async () => {
    try{
        let result = await axios.get(constants.ENDPOINTS.EMPLOYEE.GET_BOSSES);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const DeleteEmployee = async id => {
    try{
        let result = await axios.delete(`constants.ENDPOINTS.EMPLOYEE.DELETE_EMPLOYEE/${id}`);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const AddEmployee = async () => {
    try{
        let result = await axios.post(constants.ENDPOINTS.EMPLOYEE.ADD_EMPLOYEE, { });
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}