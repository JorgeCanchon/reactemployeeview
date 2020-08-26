import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import EmployeeContainer from './containers/EmployeeContainer';
import allReducers from './redux'

const store = createStore(allReducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <EmployeeContainer />
    </Provider>
  );
}

export default App;
