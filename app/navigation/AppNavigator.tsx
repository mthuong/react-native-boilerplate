import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { navigationService } from '../services/NavigationService';
import { AppProps } from '../stores/RootStore';
import { defaultNavigationOptions } from '../utils';
import { observer } from 'mobx-react';
import { SignInScreen, SignUpScreen, SplashScreen, PersonalDetailScreen } from '../screens';

const AuthStack = createStackNavigator({
  SignInScreen,
  SignUpScreen,
}, {
    initialRouteName: 'SignInScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: defaultNavigationOptions,
  });

const AuthorizedStack = createStackNavigator({
  PersonalDetailScreen,
}, {
    initialRouteName: 'PersonalDetailScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: defaultNavigationOptions,
  });

@observer
export class AppContainer extends React.Component<AppProps> {

  render() {
    const { rootStore } = this.props;
    const Container = createAppContainer(
      createSwitchNavigator({
        SplashScreen: (props: any) => (<SplashScreen {...props} screenProps={rootStore} />),
        AuthStack: hoistNonReactStatics((props: any) => (
          <AuthStack {...props} screenProps={rootStore} />
        ), AuthStack),
        AuthorizedStack: hoistNonReactStatics((props: any) => (
          <AuthorizedStack {...props} screenProps={rootStore} />
        ), AuthorizedStack),
      },
        {
          initialRouteName: 'SplashScreen',
        })
    );

    return <Container ref={(ref) => navigationService.setNavigator(ref!)} />
  }
}

