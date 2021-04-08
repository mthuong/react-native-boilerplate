import React from 'react'
import { MainStack } from './Navigator'
import { HomeScreen, HomeScreenParams } from '../scenes/Home'
import { DetailsScreen, DetailsScreenParams } from '../scenes/Details'
import { NAV_SCREENS } from './RouteNames'

export type HomeStackParamTypes = HomeScreenParams | DetailsScreenParams

function HomeStack() {
  return (
    <>
      <MainStack.Screen
        name={NAV_SCREENS.Home}
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
      <MainStack.Screen
        name={NAV_SCREENS.Details}
        component={DetailsScreen}
        options={{ title: 'My details' }}
      />
    </>
  )
}

export { HomeStack }
