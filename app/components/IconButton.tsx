import React from 'react';
import { Image, StyleProp, Text, TouchableOpacity, View } from 'react-native';
import { ApplicationFont } from '../constants';
import { styled } from '../themes';

const ButtonContentView = styled(View)<any>`
flex-direction: ${props => {
  if (props.vertical) 
    return `column`;
  return `row`;
}};
align-items: center;
justify-content: center;
`;

const ButtonText = styled(Text)<any>`
font-family: ${ApplicationFont.medium};
font-size: ${props => props.fontSize};
color: #666666;
text-align: center;
margin-top: ${props => props.vertical ? props.spacing : 0}px;
margin-left: ${props => props.horizontal ? props.spacing : 0}px;
`;

interface Props extends StyleProp<any> {
  icon: any
  text?: string
  children?: string
  fontSize?: number
  spacing?: number

  isActive?: boolean

  horizontal?: boolean
  vertical?: boolean

  onPress?(): void
}

export default class IconButton extends React.Component<Props> {

  static defaultProps = {
    horizontal: true,
    fontSize: 8,
    spacing: 8,
  }

  render() {
    const text = this.props.text || this.props.children || '';

    return (
      <TouchableOpacity onPress={this.onPress} activeOpacity={0.5} css={this.props.style}>
        <ButtonContentView horizontal={this.props.horizontal} vertical={this.props.vertical}>
          <Image source={this.props.isActive ? (this.props.activeIcon || this.props.icon) : this.props.icon} />
          {
            text === '' ? null : (
              <ButtonText 
                horizontal={this.props.horizontal} 
                vertical={this.props.vertical}
                spacing={this.props.spacing}
                fontSize={this.props.fontSize}>
                {text.toUpperCase()}
              </ButtonText>
            )
          }
        </ButtonContentView>
      </TouchableOpacity>
    )
  }

  onPress = () => this.props.onPress && this.props.onPress();
}

