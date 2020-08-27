// Definición de acciones
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = 'SET_EMPLOYEE';
export const SET_BOSSES = 'SET_BOSSES';
export const DELETE_BOSS = 'DELETE_BOSS';


// Estado inicial
export const initialState = {
  employees: [],
  bosses: []
};

// Función reductora
export default function reducerEmployee(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [
          ...state.employees,
          action.employee
        ]
      }
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees
      }
    case DELETE_BOSS:
      return {
        ...state,
        bosses: [ state.bosses.filter(x => x.idBoss !== action.idBoss) ]
      }
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: [ state.employees.filter(x => x.idEmployee !== action.idEmployee) ]
      }
    case SET_BOSSES:
      return {
        ...state,
        bosses: action.bosses
      };
    default:
      return state;
  }
}

// Creadores de acciones
export const setEmployees = employees => ({
  type: SET_EMPLOYEES,
  employees
});
export const setBosses = bosses => ({
  type: SET_BOSSES,
  bosses
});
export const deleteEmployee = idEmployee => ({
  type: DELETE_EMPLOYEE,
  idEmployee
});
export const deleteBoss = idBoss => ({
  type: DELETE_BOSS,
  idBoss
});
export const addEmployee = employee => ({
  type: ADD_EMPLOYEE,
  employee
});