import React from "react";
import { BackButton, Row } from "../../components";
import { Image } from "react-native";
import { Images } from "../../constants";
import { styled } from "../../themes";

const StepImage = styled(Image) <any>`
margin-left: ${props => props.index === 0 ? 0 : 20}px;
`;

interface StepIcon {
  normal: any
  active: any
}

interface Props {
  activeIndex: number
}

const icons: StepIcon[] = [
  { normal: Images.authStep1Icon, active: Images.authStepActive1Icon },
  { normal: Images.authStep2Icon, active: Images.authStepActive2Icon },
  { normal: Images.authStep3Icon, active: Images.authStepActive3Icon },
]

class AuthStepIndicator extends React.Component<Props> {

  render() {
    return (
      <Row css={`align-items: center;justify-content: center;`}>
        {
          icons.map((icon, index) => {
            const isHighlighted = index <= this.props.activeIndex;
            return (<StepImage key={index} index={index} source={isHighlighted ? icon.active : icon.normal} />)
          })
        }
      </Row>
    )
  }
}

interface BarOptions {
  hasStepIndicator?: boolean
  hasBackButton?: boolean
  activeIndex?: number
  onBackPress?: () => void
}
const defaultOptions: BarOptions = {
  hasStepIndicator: false,
  hasBackButton: true,
  activeIndex: 0,
}

export const navigationBarOptions = (options: BarOptions = defaultOptions) => {
  const hasBackButton = typeof options.hasBackButton === "undefined" ? true : options.hasBackButton;
  return {
    headerStyle: {
      backgroundColor: 'white',
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerLayoutPreset: 'center',
    headerTitle: options.hasStepIndicator ? <AuthStepIndicator activeIndex={options.activeIndex || 0} /> : null,
    headerLeft: hasBackButton ? <BackButton onPress={options.onBackPress} /> : null,
  };
};