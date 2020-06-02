import { Dispatch } from 'redux'

export const inc = () => ({ type: 'INC' })

export const incAsync = () => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(inc())
    }, 1000)
  }
}

export const dec = () => ({ type: 'DEC' })
