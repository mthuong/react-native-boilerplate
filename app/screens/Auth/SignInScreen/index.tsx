import { inject, observer } from 'mobx-react';
import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Column } from '../../../components';
import { Images } from '../../../constants';
import { AppProps } from '../../../stores/RootStore';
import { styled, theme } from '../../../themes';
import { getHeaderHeight, screenSize } from '../../../utils';
import { navigationBarOptions } from '../AuthNavigationBar';
import { BorderTextField, Container, ContentView, NextButton } from '../Styles';

@inject('rootStore')
@observer
export default class SignInScreen extends React.Component<AppProps> {

  static navigationOptions = {
    headerStyle: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerLayoutPreset: 'center',
    title: 'Sign In'
  }

  state = {
    bottomViewHeight: undefined
  }

  componentDidMount() {
    const { authStore } = this.props.rootStore;
    authStore.reset();
  }

  onLayoutBottomView = (event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    const bottomViewHeight = screenSize().height - y - getHeaderHeight();

    this.setState({ bottomViewHeight: bottomViewHeight });
  }

  render() {
    const { authStore: { signInStore } } = this.props.rootStore;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <ContentView css={`padding-top: 0`}>
            <Column css={`width: 100%;`}>
              <BorderTextField
                placeholderTextColor={theme.color.primary}
                placeholder="Username"
                autoCapitalize="none"
                value={signInStore.username}
                icon={Images.usernameIcon}
                onChangeText={signInStore.setUsername} />

              <BorderTextField
                css={`margin-top: 15px;`}
                placeholderTextColor={theme.color.primary}
                placeholder="Password"
                value={signInStore.password}
                secureTextEntry={true}
                icon={Images.passwordIcon}
                onChangeText={signInStore.setPassword} />
            </Column>

            <NextButton
              primary
              css={`margin-top: 20px;`}
              onPress={signInStore.signIn}>SIGN IN</NextButton>
          </ContentView>
        </KeyboardAwareScrollView>
      </Container >
    );
  }
}

