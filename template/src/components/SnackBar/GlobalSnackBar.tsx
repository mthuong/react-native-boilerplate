import * as React from 'react'
import { Snackbar } from 'react-native-paper'
import { snackbarSlice } from '../../stores'
import { useAppDispatch, useAppSelector } from '../../stores/hook'

export function GlobalSnackBar() {
  const { visible, message } = useAppSelector((state) => state.snackbar)
  const dispatch = useAppDispatch()
  return (
    <Snackbar
      duration={4000}
      visible={visible}
      onDismiss={() => dispatch(snackbarSlice.actions.hide())}>
      {message}
    </Snackbar>
  )
}
