import { ImageBackground, Text, View, ActivityIndicator, SafeAreaView, StyleProp } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import { styled } from '../themes';
import React from 'react';
import { ApplicationFont } from '../constants';

export const ScreenView = styled(SafeAreaView) <any>`
flex: ${props => props.flex || 1};
`;

export const FlexibleView = styled(View) <any>`
flex: ${props => props.flex || 1};
`;

export const CenteredView = styled(FlexibleView) <any>`
flex: ${props => props.flex || 1};
  justify-content: center;
  align-items: center;
`;

export const AbsoluteView = styled(View) <any>`
position: absolute;
${props => {
    if (props.fill)
      return `top: 0;right: 0;bottom: 0;left: 0;`
    return ``
  }}
`;

export const BackgroundImage = styled(ImageBackground)`
width: ${props => props.width || '100%'};
height: ${props => props.height || '100%'};
`;

export const Row = styled(View) <any>`
flex: ${props => props.flex || `none`};
flex-direction: row;
${props => props.center ? `justify-content: center;` : ``}
`;

export const Column = styled(View) <any>`
flex: ${props => props.flex || `none`};
flex-direction: column;
${props => props.center ? `align-items: center;` : ``};
`;

export const PrimaryTitle = styled(Text)`
color: ${props => props.theme.color.primary};
`;

export const HighlightedTitle = styled(Text)`
color: #F1AE00;
`;

export const Title1 = styled(Text)`
color: #4A4A4A;
`;

export const Title2 = styled(Text)`
color: #666666;
`;

export const Title3 = styled(Text)`
color: #404548;
`;

export const StatusContainer = styled(Row)`
background-color: ${props => {
    if (props.status === 'Requested')
      return props.theme.color.requestedStatus;
    if (props.status === 'Confirmed')
      return props.theme.color.confirmedStatus;
    if (props.status === 'In Progress')
      return props.theme.color.inprogressStatus;
    return `transparent`;
  }};
height: 25px;
border-radius: 20px;
padding: 0 15px;
align-items: center;
justify-content: center;
`;

export const StatusLabel = styled(Text)`
font-family: ${ApplicationFont.medium};
font-size: 12px;
color: white;
`;

interface CenterActivityIndicatorProps extends StyleProp<any> { }
export const CenterActivityIndicator: React.SFC<CenterActivityIndicatorProps> = (props) => {

  return (
    <Row center flex={1} css={props.style}>
      <ActivityIndicator />
    </Row>
  )
}
