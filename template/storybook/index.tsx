// if you use expo remove this line
import './rn-addons'

import React from 'react'
import { AppRegistry, Platform } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { withKnobs } from '@storybook/addon-knobs'
import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native'
import LocalizationProvider from 'localization'
import store from 'stores/store'
import { ThemeProvider } from 'theme'

import { name as appName } from '../app.json'

import { loadStories } from './storyLoader'

// enables knobs for all stories
addDecorator(withKnobs)

// Config providers
addDecorator((Story: any) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <LocalizationProvider>
          <Story />
        </LocalizationProvider>
      </ThemeProvider>
    </StoreProvider>
  )
})

// import stories
configure(() => {
  loadStories()
}, module)

// Refer to https://github.com/storybookjs/react-native/tree/master#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
  asyncStorage: AsyncStorage,
})

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot)

export default StorybookUIRoot
