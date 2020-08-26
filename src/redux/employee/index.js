// Definición de acciones
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_BOSSES = 'SET_BOSSES';


// Estado inicial
export const initialState = {
  employees: [],
  bosses: []
};

// Función reductora
export default function reducerEmployee(state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees
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