import React from 'react';
import { StyleProp, Text, TouchableOpacity } from 'react-native';
import { ApplicationFont } from '../constants';
import { styled } from '../themes';

const Button = styled(TouchableOpacity) <Props>`
height: 45px;
border-radius: ${props => {
    if (props.rounded)
      return 23;
    return 5;
  }};
background-color: ${props => {
    if (props.primary)
      return props.theme.color.primary;
    if (props.highlight)
      return props.theme.color.highlight;
    return 'white';
  }};
justify-content: center;
`;

const ButtonText = styled(Text) <Props>`
font-family: ${props => props.fontFamily};
text-align: center;
font-size: ${props => props.fontSize || `16px`};
color: ${props => {
    if (props.primary || props.highlight)
      return 'white';
    if (props.textColor)
      return props.textColor;
    return props.theme.color.primary;
  }};
`;

interface Props extends StyleProp<any> {
  rounded?: boolean
  primary?: boolean
  highlight?: boolean

  titleCss?: string
  textColor?: string
  fontSize?: number
  fontFamily?: string
  text?: string
  textAlign?: string

  onPress?(event: any): void
}

const DefaultButton: React.SFC<Props> = (props) => {

  return (
    <Button
      onLayout={props.onLayout}
      css={props.style}
      rounded={props.rounded}
      primary={props.primary}
      highlight={props.highlight}
      onPress={props.onPress}
      {...props}>
      <ButtonText
        css={props.titleCss}
        fontSize={props.fontSize || 16}
        fontFamily={props.fontFamily || ApplicationFont.medium}
        primary={props.primary}
        highlight={props.highlight}
        textColor={props.textColor}>
        {props.text || props.children || ''}
      </ButtonText>
    </Button>
  )
}

export default DefaultButton;

