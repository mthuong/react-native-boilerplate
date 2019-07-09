import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styled } from "../themes";
import { Row, FlexibleView } from "./GlobalComponents";
import { Images } from "../constants";

const RadioButtonContainer = styled(Row) <any>`
height: 45px;
background-color: #F8F8F8;
border-radius: 5px;
margin-top: ${props => props.index === 0 ? 0 : props.itemSpacing || 0}px;
align-items: center;
`;

const LeadingButton = styled(TouchableOpacity)`
height: 100%;
align-items: center;
justify-content: center;
margin-right: 10px;
padding: 0 10px;
border-right-width: 1px;
border-right-color: #F0F0F0;
`;

interface RadioButtonProps {
  index: number
  itemSpacing?: number
  checked: boolean

  style?: string
  leadingStyle?: string
  onPress?(): void
}

export default class RadioButton extends React.Component<RadioButtonProps> {

  static defaultProps = {
    itemSpacing: 10
  }

  render() {
    return (
      <RadioButtonContainer
        css={this.props.style}
        itemSpacing={this.props.itemSpacing}
        index={this.props.index}>
        <LeadingButton css={this.props.leadingStyle} activeOpacity={0.5} onPress={this.props.onPress}>
          <Image
            css={`align-self: center;`}
            source={this.props.checked ? Images.radioCheckedIcon : Images.radioIcon} />
        </LeadingButton>
        <FlexibleView>
          {this.props.children}
        </FlexibleView>
      </RadioButtonContainer>
    )
  }
}