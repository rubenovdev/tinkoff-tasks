import React from 'react'
import ReactDOM from 'react-dom'
import { Action, Dispatch, MiddlewareAPI, Store } from 'redux'
import * as Sentry from '@sentry/browser'
import { sentryDSN } from './constants/sentry'
import { Provider } from './connect'
import App from './components/App/App'
import reducer from './reducer'
import { State } from './models/store'

Sentry.init({ dsn: sentryDSN })

const middleware = (middlewareStore: MiddlewareAPI) => (next: (param: any) => void) => (
  action: Action | ((dispatch: Dispatch, getState: () => State) => void)
) => {
  if (typeof action === 'function') {
    return action(middlewareStore.dispatch, middlewareStore.getState)
  }

  next(action)
}

console.log('middleware: ', middleware)

const createStore: (rootReducer: (state: State | undefined, action: Action) => State) => Store = (
  rootReducer
) => {
  let state = rootReducer(undefined, { type: 'INIT_STORE' })
  let subscribeFunctions: (() => void)[] = []

  return {
    getState: () => state,
    dispatch: (action) => {
      state = rootReducer(state, action)
      subscribeFunctions.forEach((fn) => fn())
      return action
    },
    subscribe: (fn) => {
      subscribeFunctions.push(fn)

      return () => {
        subscribeFunctions = subscribeFunctions.filter((item) => item !== fn)
      }
    },
    replaceReducer: () => {},
    [Symbol.observable]: () => ({} as any),
  }
}

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
