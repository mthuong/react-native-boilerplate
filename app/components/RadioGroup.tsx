import React from "react";
import { ApplicationFont } from "../constants";
import { ISelectionItemModel } from "../models";
import { styled } from "../themes";
import { Column, Title2 } from "./GlobalComponents";
import RadioButton from "./RadioButton";

const RadioGroupContainer = styled(Column)``;

export const DefaultRadioText = styled(Title2)`
font-family: ${ApplicationFont.regular};
font-size: 15px;
padding: 0 10px;
`;

interface RadioGroupProps {
  selectedItem?: ISelectionItemModel
  dataSources: ISelectionItemModel[]

  itemSpacing?: number

  onChange?(item: ISelectionItemModel): void
  radioComponentBuilder?(item: ISelectionItemModel, index: number): React.ReactNode
}

export default class RadioGroup extends React.Component<RadioGroupProps> {

  state = {
    selectedItem: this.props.selectedItem
  }

  componentWillReceiveProps(props: RadioGroupProps) {
    const { selectedItem } = props;
    this.setState({ selectedItem });
  }

  render() {
    return (
      <RadioGroupContainer>
        {
          this.props.dataSources.map((item, index) => {
            const isSelected = item.value === (this.state.selectedItem && this.state.selectedItem.value)

            return (
              <RadioButton
                key={`${item.value}_${index}`}
                checked={isSelected}
                index={index}
                itemSpacing={this.props.itemSpacing}
                onPress={this.onRadioPress.bind(this, item)}>
                {
                  this.props.radioComponentBuilder ? this.props.radioComponentBuilder(item, index) : (
                    <DefaultRadioText>{item.displayName}</DefaultRadioText>
                  )
                }
              </RadioButton>
            )
          })
        }
      </RadioGroupContainer>
    )
  }

  onRadioPress = (item: ISelectionItemModel) => {
    this.setState({ selectedItem: item });
    this.props.onChange && this.props.onChange(item);
  }
}
