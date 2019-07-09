import React from 'react';
import { Image, TextInputProps } from 'react-native';
import { TextInputMask, TextInputMaskProps, TextMaskInstance } from 'react-native-masked-text';
import { ApplicationFont } from '../constants';
import { styled, theme } from '../themes';
import { Row } from './GlobalComponents';
import { TextInput } from 'react-native-gesture-handler';

const Container = styled(Row)`
height: 45px;
align-items: center;
border-radius: 5px;
background-color: #F8F8F8;
`;

const TextField = styled(TextInput) <any>`
flex: 1;
font-family: ${ApplicationFont.regular};
font-size: 15px;
color: #666666;
padding: 0 10px;
`;

const MaskField = styled(TextInputMask) <any>`
flex: 1;
font-family: ${ApplicationFont.regular};
font-size: 15px;
color: #666666;
padding: 0 10px;
`;

const Icon = styled(Image) <any>`
margin-left: 10px;
width:${props => props.iconSize || 30}px;
`;

interface Props extends TextInputProps {
  icon?: any
  iconSize?: number
  iconColor?: string

  textAlign?: string
  contentPadding?: string
  fieldCss?: string
}

export class DefaultTextField extends React.Component<Props> {

  static defaultProps = {
    iconColor: theme.color.primary
  }

  render() {
    const textFieldProps = { ...this.props };
    delete textFieldProps.style;

    return (
      <Container css={this.props.style as any}>
        {
          this.props.icon && (
            <Icon
              iconSize={this.props.iconSize}
              source={this.props.icon}
              tintColor={this.props.iconColor}
              resizeMode="contain" />
          )
        }
        <TextField
          {...textFieldProps}
          underlineColorAndroid='transparent'
          css={this.props.fieldCss} />
      </Container>
    )
  }
}

interface MaskTextFieldProps extends TextInputMaskProps {
  icon?: any
  iconSize?: number

  textAlign?: string
  contentPadding?: string

  fieldCss?: string
}

export class MaskTextField extends React.Component<MaskTextFieldProps> {

  private fieldRef: TextMaskInstance | null = null

  render() {
    const textFieldProps = { ...this.props };
    delete textFieldProps.style;

    return (
      <Container css={this.props.style as any}>
        {
          this.props.icon && (
            <Icon
              iconSize={this.props.iconSize}
              source={this.props.icon}
              resizeMode="contain" />
          )
        }
        <MaskField
          {...textFieldProps}
          underlineColorAndroid='transparent'
          css={this.props.fieldCss}
          ref={(ref: any) => this.fieldRef = ref} />
      </Container>
    )
  }

  focus = () => this.fieldRef && this.fieldRef.getElement().focus()

  blur = () => this.fieldRef && this.fieldRef.getElement().blur()
}


