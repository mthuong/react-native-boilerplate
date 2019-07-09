import React from "react";
import { Image, Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { ApplicationFont, Images } from "../constants";
import { styled } from "../themes";

const ButtonContainer = styled(TouchableOpacity)`
flex-direction: row;
align-items: center;
`

const Title = styled(Text)<any>`
font-family: ${ApplicationFont.regular};
color: #4A4A4A;
font-size: 15px;
margin-left: 5px;
margin-right: 5px;
`

interface Props extends StyleProp<any> {
  title?: string
  titleCss?: string
  checked?: boolean

  onChange?(value: boolean): void
}

interface State {
  checked: boolean
}

export default class CheckboxButton extends React.Component<Props, State> {

  state = {
    checked: this.props.checked || false
  }

  componentWillReceiveProps(props: Props) {
    const checked = props.checked || false;
    this.setState({ checked });
  }

  render() {
    return (
      <ButtonContainer onPress={this.onPress} css={this.props.style}>
        <Image source={this.state.checked ? Images.checkboxCheckedIcon : Images.checkboxIcon} />
        {
          (this.props.title || this.props.title !== "") ? (
            <Title css={this.props.titleCss}>{this.props.title}</Title>
          ) : null
        }
      </ButtonContainer>
    )
  }

  onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.state.checked);
      this.setState((state: State) => ({
        checked: !state.checked
      }))
    }
  }
}