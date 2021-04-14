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
import { Provider as PaperProvider } from 'react-native-paper'
import store from './src/stores/store'
import { theme } from './src/theme'
import { Navigator } from './src/navigator/Navigator'
import { GlobalSnackBar } from './src/components/SnackBar/GlobalSnackBar'
import LocalizationProvider from './src/languages'

// Enable screens support before any of your navigation screens renders
enableScreens()

// declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <LocalizationProvider>
          <Fragment>
            <Navigator />
            <GlobalSnackBar />
          </Fragment>
        </LocalizationProvider>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App
