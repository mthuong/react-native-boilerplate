import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp } from 'react-native';
import { styled } from '../themes';
import { ApplicationFont } from '../constants';


interface Props extends StyleProp<any> {
  primary?: boolean
  disabled?: boolean

  style?: string
  textStyle?: string
  textColor?: string
  text?: string

  onPress?(event: any): void
}

const Button = styled(TouchableOpacity) <Props>`
padding-top: 5px;
padding-bottom: 5px;
background-color: red;
`;

const ButtonText = styled(Text) <Props>`
font-family: ${ApplicationFont.regular};
font-size: 12px;
color: ${props => {
    if (props.primary)
      return props.theme.color.primary;
    if (props.disabled)
      return props.textColor;
    return props.theme.color.primary;
  }};
`;

export default class TouchableText extends React.PureComponent<Props> {
  render() {

    const { style, disabled, text, textStyle, children } = this.props;
    return (
      <Button css={style}>
        <ButtonText css={textStyle}>{text || children || ''}</ButtonText>
      </Button>
    );
  }
}
