import { inject, observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackButton, DefaultTextField, FieldSet, FlexibleView } from '../../../components';
import { UserModel } from '../../../models';
import { AppProps } from '../../../stores/RootStore';
import { styled } from '../../../themes';
import { ContentView, Subtitle } from '../../Auth/Styles';

const SectionTitle = styled(Subtitle)`
color: ${props => props.theme.color.primary};
font-size: 18px;
text-align: left;
`;

@inject('rootStore')
@observer
export default class PersonalDetailScreen extends React.Component<AppProps> {

  static navigationOptions = {
    title: 'Personal Details',
    headerLeft: <BackButton />,
  }

  state = {
    loadInfoPromise: fromPromise.resolve()
  };

  componentDidMount() {
    const { userStore } = this.props.rootStore,
      authUser = userStore.copiedAuthUser!;
    // Clear user information when go to personal detail
    userStore.cloneAuthUser()
  }

  render() {
    const { userStore } = this.props.rootStore,
      authUser = userStore.copiedAuthUser!,
      model = authUser as UserModel;

    return (
      <FlexibleView>
        <KeyboardAwareScrollView>
          <ContentView css={`align-items: stretch;`}>
            <SectionTitle>Introduction</SectionTitle>

            <FieldSet title="First name" titleCss={`color: #545454;margin-top: 20px;`}>
              <DefaultTextField
                value={model.firstName}
                onChangeText={(value) => model.firstName = value} />
            </FieldSet>

            <FieldSet title="Last name" titleCss={`color: #545454;`} css={`margin-top: 20px;`}>
              <DefaultTextField
                value={model.lastName}
                onChangeText={(value) => model.lastName = value} />
            </FieldSet>

            <FieldSet title="Email" titleCss={`color: #545454;`} css={`margin-top: 20px;`}>
              <DefaultTextField
                value={model.email}
                onChangeText={(value) => model.email = value}
                keyboardType="email-address" />
            </FieldSet>

          </ContentView>
        </KeyboardAwareScrollView>
      </FlexibleView>
    );
  }
}

