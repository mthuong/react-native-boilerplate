import * as React from 'react'
import { View, Text } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { useAppSelector, useAppDispatch } from '../../stores/hook'
import { snackbarSlice } from '../../stores'

export interface GlobalSnackBarProps {}

export function GlobalSnackBar(props: GlobalSnackBarProps) {
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
