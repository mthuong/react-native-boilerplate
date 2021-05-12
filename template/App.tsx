/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment } from 'react'
import { enableScreens } from 'react-native-screens'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/stores/store'
import Navigator from './src/navigator/Navigator'
import { GlobalSnackBar } from './src/components/SnackBar/GlobalSnackBar'
import LocalizationProvider from './src/localization'
import { ThemeProvider } from './src/theme'

// Enable screens support before any of your navigation screens renders
enableScreens()

// declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <LocalizationProvider>
          <Fragment>
            <Navigator />
            <GlobalSnackBar />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
