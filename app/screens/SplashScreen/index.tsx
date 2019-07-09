import { inject, observer } from 'mobx-react';
import React from 'react';
import { default as NativeSplashScreen } from 'react-native-splash-screen';
import { FlexibleView } from '../../components';
import { authService } from '../../services/AuthService';
import { navigationService } from '../../services/NavigationService';
import { AppProps } from '../../stores/RootStore';
import { delay } from '../../utils';
import { Text } from 'react-native';

@inject('rootStore')
@observer
export default class SplashScreen extends React.Component<AppProps> {

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await delay(500);
    await navigationService.ready();
    const { userStore } = this.props.rootStore;
    const user = await authService.validateAuthUser();
    // NativeSplashScreen.hide();
    if (user) {
      userStore.setAuthUser(user);
      navigationService.navigate('AuthorizedStack')
    } else navigationService.navigate('AuthStack');
  }

  render() {
    return (
      <FlexibleView>
        {/* <Text>Splash screen</Text> */}
      </FlexibleView>
    );
  }
}
