/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { theme } from './app/themes';
import { rootStore } from './app/stores/RootStore';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import { FlexibleView, AlertView, HudView } from './app/components';
import { AppContainer } from './app/navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider rootStore={rootStore}>
        <FlexibleView>
          <StatusBar barStyle="light-content" />
          <AppContainer rootStore={rootStore} />

          <AlertView rootStore={rootStore} />

          <HudView />

        </FlexibleView>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
