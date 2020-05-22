import React, { createContext, Dispatch, FC, useState } from 'react'
import { Store } from 'redux'
import { State } from './models/store'

export const { Provider, Consumer } = createContext<Store | null>(null)

function defaultMergeProps<SProps, DProps, OProps>(
  stateProps: SProps,
  dispatchProps: DProps,
  ownProps: OProps
) {
  return { ...stateProps, ...dispatchProps, ...ownProps }
}

export function connect<SProps = {}, DProps = {}, OProps = {}, MProps = SProps & DProps & OProps>(
  mapStateToProps: (state: State) => SProps,
  mapDispatchToProps: (dispatch: Dispatch<any>) => DProps = () => ({} as DProps),
  mergeProps: (
    stateProps: SProps,
    dispatchProps: DProps,
    ownProps: OProps
  ) => MProps = defaultMergeProps as any
) {
  return (InnerComponent: FC<MProps>) => {
    const ConnectedComponent = ({ ownProps, store }: { ownProps: OProps; store: Store }) => {
      const [stateProps, setStateProps] = useState(mapStateToProps(store.getState()))

      store.subscribe(() => {
        setStateProps(mapStateToProps(store.getState()))
      })

      const dispatchProps = mapDispatchToProps(store.dispatch)
      const mergedProps = mergeProps(stateProps, dispatchProps, ownProps)

      return <InnerComponent {...mergedProps} />
    }

    return (props: OProps) => {
      return (
        <Consumer>
          {(store) => {
            if (!store) {
              throw new Error('Not Store')
            }

            return <ConnectedComponent ownProps={props} store={store} />
          }}
        </Consumer>
      )
    }
  }
}
