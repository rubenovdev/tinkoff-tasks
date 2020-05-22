import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from './connect'
import App from './components/App/App'
import reducer from './reducer'

const store = createStore(reducer)

;(window as any).store = store

ReactDOM.render(
  <Provider value={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
