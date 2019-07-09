import { observer } from 'mobx-react';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ApplicationFont, Images } from '../constants';
import { AppProps } from '../stores/RootStore';
import { styled } from '../themes';
import IconButton from './IconButton';
import { Column, Row, Title1 } from './GlobalComponents';
import { delay } from '../utils';

const ModalContainer = styled(Column)`
justify-content: center;
align-items: center;
background-color: white;
border-radius: 10px;
padding: 20px 30px 20px 30px;
`;

const Title = styled(Title1)`
font-family: ${ApplicationFont.semiBold};
font-size: 20px;
margin: 10px 0;
text-align: center;
`;

const Message = styled(Title1)`
font-family: ${ApplicationFont.regular};
font-size: 15px;
text-align: center;
`;

const ButtonRow = styled(Row)`
justify-content: center;
margin-top: 20px;
padding: 0 20px;
`;

const AlertButton = styled(TouchableOpacity) <any>`
flex: 1;
max-width: 170px;
margin-left: ${props => props.index === 0 ? 0 : 10}px;
border-radius: 4px;
background-color: ${props => {
    if (props.buttonStyle === 'cancel')
      return `#B5B4B5`;
    return props.theme.color.primary;
  }};
justify-content: center;
align-items: center;
padding: 10px 20px;
`;

const ButtonText = styled(Text)`
font-family: ${ApplicationFont.semiBold};
font-size: 12px;
color: white;
`;

@observer
export default class AlertView extends React.Component<AppProps> {

  componentWillReceiveProps(nextProps: AppProps) {
    const { alertStore: { options } } = nextProps.rootStore;
    if (options.autoCloseAfterSeconds) {
      setTimeout(() => {
        const { alertStore } = this.props.rootStore;
        alertStore.hideAlert(0);
      }, options.autoCloseAfterSeconds)
    }
  }

  async componentDidUpdate() {
    const { alertStore: { options } } = this.props.rootStore;
    if (options.autoCloseAfterSeconds) {
      await delay(options.autoCloseAfterSeconds * 1000)
      const { alertStore } = this.props.rootStore;
      alertStore.hideAlert(0);
    }
  }

  render() {
    const { alertStore, alertStore: { options } } = this.props.rootStore;

    return (
      <Modal isVisible={alertStore.isVisible}>
        <ModalContainer>
          <Image source={options.type === 'error' ? Images.alertErrorIcon : Images.alertSuccessIcon} />

          {this.hasTitle() ? <Title>{options.title}</Title> : null}
          {this.hasMessage() ? <Message>{options.message}</Message> : null}

          <ButtonRow>
            {
              options.buttonTitles && options.buttonTitles.map((title, i) => (
                <AlertButton
                  key={`alertbutton_${i}`}
                  index={i}
                  buttonStyle={(options.buttonStyles && options.buttonStyles[i]) || "default"}
                  onPress={this.onPress.bind(this, i)}>
                  <ButtonText>{title}</ButtonText>
                </AlertButton>
              ))
            }
          </ButtonRow>

          {
            options.hasCloseButton ? (
              <IconButton
                css={`position: absolute;top: 10px;right: 10px;`}
                onPress={this.onPress.bind(this, -1)}
                icon={Images.alertCloseIcon} />
            ) : null
          }
        </ModalContainer>
      </Modal>
    )
  }

  hasTitle = () => {
    const { alertStore: { options } } = this.props.rootStore;
    return options.title && options.title !== '';
  }

  hasMessage = () => {
    const { alertStore: { options } } = this.props.rootStore;
    return options.message && options.message !== '';
  }

  onPress = (index: number) => {
    const { alertStore } = this.props.rootStore;
    alertStore.hideAlert(index);
  }
}

