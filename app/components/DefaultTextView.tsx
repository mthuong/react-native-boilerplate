import React from "react";
import { TextInputProps, View, TextInput } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import { ApplicationFont } from "../constants";
import { styled } from "../themes";

const Container = styled(View)`
flex-direction: row;
justify-content: center;
border-radius: 5px;
background-color: #F8F8F8;
`;

const TextView = styled(TextInput) <any>`
flex: 1;
font-family: ${ApplicationFont.regular};
font-size: 15px;
color: #666666;
padding: ${props => props.contentPadding || `10px`};
`;

interface Props extends TextInputProps {
  contentPadding?: string
}

export default class DefaultTextView extends React.Component<Props> {

  render() {
    const textFieldProps = { ...this.props };
    delete textFieldProps.style;

    return (
      <Container css={this.props.style as any}>
        <TextView multiline={true} {...textFieldProps} underlineColorAndroid='transparent' />
      </Container>
    )
  }
}