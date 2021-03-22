import React from 'react'
import { MainStack } from './Navigator'
import { HomeScreen } from '../scenes/Home'
import { DetailsScreen } from '../scenes/Details'

function HomeStack() {
  return (
    <>
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
      <MainStack.Screen
        name='Details'
        component={DetailsScreen}
        options={{ title: 'My details' }}
      />
    </>
  )
}

export default HomeStack
