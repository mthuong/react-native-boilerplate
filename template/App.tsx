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
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
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
      <PaperProvider theme={DefaultTheme}>
        <ThemeProvider>
          <LocalizationProvider>
            <Fragment>
              <Navigator />
              <GlobalSnackBar />
            </Fragment>
          </LocalizationProvider>
        </ThemeProvider>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App
