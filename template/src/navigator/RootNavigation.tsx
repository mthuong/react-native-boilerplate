// RootNavigation.js

import * as React from 'react'
import { CommonActions, NavigationContainerRef } from '@react-navigation/native'

import { RootStackParamTypes } from './Navigator'
import { NAV_SCREENS } from './RouteNames'

export const navigationRef = React.createRef<NavigationContainerRef>()

export const navigationState = {
  isReady: false,
}

/**
 * Navigating without the navigation prop
 *
 * @export
 * @param {*} name - Maybe string but not know as typescript
 * @param {*} params - [key: value] base on RootStackParamList
 */
export function navigate(name: NAV_SCREENS, params?: RootStackParamTypes) {
  if (navigationState.isReady && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    )
  } else {
    // FIXME: You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// add other navigation functions that you need and export them
export const back = () => {
  navigationRef.current?.goBack()
}
