import React, { FC } from 'react'
import { connect } from 'react-redux'
import { inc, dec } from '../../actions'
import { State } from '../../models/store'

const AppView: FC<Props> = ({ count, inc, dec }) => {
  return (
    <div>
      <h2>Счетчик</h2>
      <button onClick={dec}>-</button>
      <p>{count}</p>
      <button onClick={inc}>+</button>
    </div>
  )
}

const App = connect(
  (state: State) => ({
    count: state.count,
  }),
  {
    inc,
    dec,
  }
)(AppView)

export default App

interface Props {
  count: number
  inc(): void
  dec(): void
}
