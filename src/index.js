import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import App from './js/components/App';
import mainReducer from './js/reducers/mainReducer';

const myStore = createStore(mainReducer);

render(
	<Provider store={myStore}>
    <App store = {myStore}/>
  </Provider>  
    , document.getElementById('app'))
