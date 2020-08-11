import React from 'react'
import { render } from 'react-dom'
import { store, history } from './store/index'
import { Provider } from 'react-redux'
import App from './components/App/index'
import './global.module.css'

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
