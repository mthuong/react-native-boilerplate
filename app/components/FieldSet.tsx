import React from 'react';
import { StyleProp, View } from 'react-native';
import { ApplicationFont } from '../constants';
import { styled } from '../themes';
import { Title2 } from './GlobalComponents';

const FieldSetLabel = styled(Title2)`
font-family: ${ApplicationFont.semiBold};
font-size: 12px;
margin-bottom: 5px;
`;

interface Props extends StyleProp<any> {
  title: string
  titleCss?: string
}

const FieldSet: React.SFC<Props> = (props) => {

  return (
    <View css={props.style}>
      <FieldSetLabel css={props.titleCss}>{props.title.toUpperCase()}</FieldSetLabel>
      {props.children}
    </View>
  )
}

export default FieldSet;