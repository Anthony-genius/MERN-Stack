import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers/rootReducer'

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
)
