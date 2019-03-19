import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reduxThunk from 'redux-thunk';

import App from './App'
import reducers from './reducers'


// DEV TOOLS REDUX
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const history = createHistory()
const middleware = [routerMiddleware(history),thunk];

const store = createStore(
  reducers,
  applyMiddleware(...middleware),
  composeEnhacers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <Provider store={ store }>
    <App history={ history }/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
