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
import { I18nextProvider } from 'react-i18next'
import { enableScreens } from 'react-native-screens'
import { Provider as StoreProvider } from 'react-redux'
import i18n from 'localization/i18n'

import { GlobalSnackBar } from './src/components/SnackBar/GlobalSnackBar'
import LocalizationProvider from './src/localization'
import Navigator from './src/navigator/Navigator'
import store from './src/stores/store'
import { ThemeProvider } from './src/theme'

// Enable screens support before any of your navigation screens renders
enableScreens()

// declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <LocalizationProvider>
            <Fragment>
              <Navigator />
              <GlobalSnackBar />
            </Fragment>
          </LocalizationProvider>
        </I18nextProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

// export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App
export default App
