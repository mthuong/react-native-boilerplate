import * as React from 'react'

import { snackbarSlice } from '../../stores'
import { useAppDispatch, useAppSelector } from '../../stores/hook'

import Snackbar from './index'

export function GlobalSnackBar() {
  const { visible, message } = useAppSelector(state => state.snackbar)
  const dispatch = useAppDispatch()

  return (
    <Snackbar
      duration={4000}
      visible={visible}
      onDismiss={() => dispatch(snackbarSlice.actions.hide())}
      action={{
        label: 'X',
        onPress: () => {
          // Do something
        },
      }}>
      {message}
    </Snackbar>
  )
}
