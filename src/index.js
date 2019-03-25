import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//ele vai permitir a integração simplificada do react com o redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'//applyMiddleware para permitir aplicar um Middleware na nossa store
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import TodoSaga from './data/sagas/TodoSaga'

import rootReducer from './data/reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware))//e aplicamos o Middleware na nossa store

//depois de passar o sagaMiddleware para a store, mandamos ele executar a nossa TodoSaga
sagaMiddleware.run(TodoSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);