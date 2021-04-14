import { useLocalizationContext } from 'languages'
import React from 'react'
import { DetailsScreen, DetailsScreenParams } from '../scenes/Details'
import { HomeScreen, HomeScreenParams } from '../scenes/Home'
import { MainStack } from './Navigator'
import { NAV_SCREENS } from './RouteNames'

export type HomeStackParamTypes = HomeScreenParams | DetailsScreenParams

function HomeStack() {
  const languages = useLocalizationContext()

  return (
    <>
      <MainStack.Screen
        name={NAV_SCREENS.Home}
        component={HomeScreen}
        options={{ title: languages.Home }}
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
