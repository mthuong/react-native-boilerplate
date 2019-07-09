import { Text } from 'react-native';
import { Column, DefaultTextField, FlexibleView, IconButton, DefaultButton } from '../../components';
import { ApplicationFont } from '../../constants';
import { styled } from '../../themes';

export const Container = styled(FlexibleView)`
background-color: white;
`;

export const ContentView = styled(Column)`
align-items: center;
justify-content: center;
padding: 30px 20px 20px;
`;

export const BorderTextField = styled(DefaultTextField)`
width: 100%;
background-color: #F1F1F1;
border-width: 1px;
border-color: #EEEEEE;
`;

export const Subtitle = styled(Text)`
font-family: ${ApplicationFont.semiBold};
font-size: 24px;
text-align: center;
color: white;
`;

export const Title = styled(Text)`
font-family: ${ApplicationFont.bold};
font-size: 36px;
color: white;
`;

export const StaticLabel = styled(Text)`
font-family: ${ApplicationFont.regular};
font-size: 15px;
text-align: center;
color: white;
`;

export const BorderLine = styled(FlexibleView)`
background-color: #EDEDED; 
height: 1px;
`;

export const SocialButton = styled(IconButton)`
flex: 1;
border-radius: 4px;
background-color: white;
box-shadow: 0 2px 23px rgb(228,230,233);
elevation: 12;
padding: 10px 0;
`;

export const NextButton = styled(DefaultButton)`
width: 100%;
background-color: #320C7A;
`;





