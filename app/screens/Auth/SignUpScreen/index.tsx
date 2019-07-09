import { inject, observer } from 'mobx-react';
import React from 'react';
import { Image, View, LayoutChangeEvent } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DefaultButton, Row, Column } from '../../../components';
import { ApplicationFont, Images } from '../../../constants';
import { navigationService } from '../../../services/NavigationService';
import { AppProps } from '../../../stores/RootStore';
import { theme, styled } from '../../../themes';
import { BorderTextField, Container, ContentView, NextButton, StaticLabel, Title } from '../Styles';
import { navigationBarOptions } from '../AuthNavigationBar';
import { screenSize, getHeaderHeight } from '../../../utils';

const DistributeView = styled(View) <any>`
justify-content: space-between;
align-content: center;
`

@inject('rootStore')
@observer
export default class SignUpScreen extends React.Component<AppProps> {

  static navigationOptions = navigationBarOptions()

  state = {
    bottomViewHeight: undefined
  }

  componentDidMount() {
    this.props.rootStore.authStore.signUpStore.validateSignUpInputs()
  }

  onLayoutBottomView = (event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    const bottomViewHeight = screenSize().height - y - getHeaderHeight();

    this.setState({ bottomViewHeight: bottomViewHeight });
  }

  render() {
    const { authStore: { signUpStore } } = this.props.rootStore;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <ContentView css={`padding-top: 0`}>
            <Title css={`margin: 30px 0;`}>Sign up</Title>

            <Column css={`width: 100%;`}>
              <BorderTextField
                placeholderTextColor={theme.color.primary}
                placeholder="Username"
                autoCapitalize="none"
                value={signUpStore.username}
                onChangeText={signUpStore.setUsername} />

              <BorderTextField
                css={`margin-top: 15px;`}
                placeholderTextColor={theme.color.primary}
                placeholder="Password"
                value={signUpStore.password}
                secureTextEntry={true}
                onChangeText={signUpStore.setPassword} />

              <BorderTextField
                css={`margin-top: 15px;`}
                placeholderTextColor={theme.color.primary}
                placeholder="Confirm password"
                value={signUpStore.confirmPassword}
                secureTextEntry={true}
                onChangeText={signUpStore.setConfirmPassword} />
            </Column>

            <NextButton
              primary
              css={`margin-top: 20px;`}
              onPress={signUpStore.validateSignUpInputs}>NEXT</NextButton>
            <DistributeView
              css={`height: ${this.state.bottomViewHeight || 0}`}
              onLayout={(event: any) => this.onLayoutBottomView(event)}>
              <View style={{ alignItems: 'center' }}>
                <StaticLabel css={`margin-top: 20px;`}>By tapping next button you agree</StaticLabel>
                <Row css={`align-items: center;`}>
                  <StaticLabel>to the</StaticLabel>
                  <DefaultButton
                    primary
                    css={`background-color: transparent; margin-left: 5px;`}
                    titleCss={`font-size: 15px;font-family: ${ApplicationFont.bold};`}>Terms of use</DefaultButton>
                </Row>
              </View>

              <Row css={`align-items: center; margin-bottom: 30px;`}>
                <StaticLabel>Already have an account?</StaticLabel>
                <DefaultButton
                  primary
                  css={`background-color: transparent; margin-left: 5px;`}
                  titleCss={`font-size: 15px;font-family: ${ApplicationFont.bold};`}
                  onPress={this.onSignInPress}>Sign in</DefaultButton>
              </Row>
            </DistributeView>
          </ContentView>
        </KeyboardAwareScrollView>
      </Container >
    );
  }

  onSignInPress = () => {
    navigationService.goBack();
  }

  onNext = () => {
    navigationService.navigate('PersonalDetailScreen');
  }
}
