import React from "react";
import { ScrollView, StyleProp, View } from "react-native";
import { styled } from "../themes";

const Container = styled(View)``;

interface Props extends StyleProp<any> {
  scrollable: boolean
}

export default class KeyboardView extends React.Component<Props> {

  render() {
    return (
      <Container css={this.props.style}>
        {
          this.props.scrollable ? (
            <ScrollView>
              { this.props.children }
            </ScrollView>
          ) : this.props.children
        }
      </Container>
    )
  }
}