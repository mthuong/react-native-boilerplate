import React from 'react';
import { Image, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Images } from '../constants';
import { navigationService } from '../services/NavigationService';
import { styled } from '../themes';

const RoundedView = styled(TouchableOpacity)<any>`
width: 35px;
height: 35px;
border-radius: 17px;
box-shadow: 0 6px 10px rgba(23,4,50,0.1);
elevation: 10;
background-color: white;
justify-content: center;
align-items; center;
margin-left: 20px;
`;

interface Props {
  onPress?(): void
}

export class BackButton extends React.Component<Props> {

  render() {
    return (
      <RoundedView onPress={this.onPress}>
        <Image source={Images.backIcon} css={`align-self: center;`} />
      </RoundedView>
    )
  }

  onPress = () => {
    if (this.props.onPress) this.props.onPress();
    else navigationService.goBack();
  }
}

export default BackButton;

