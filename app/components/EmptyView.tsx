import React from 'react';
import { Image } from 'react-native';
import { ApplicationFont, Images } from '../constants';
import { styled } from '../themes';
import { CenteredView, PrimaryTitle } from './GlobalComponents';

const Title = styled(PrimaryTitle)`
  font-size: 14px;
  font-family: ${ApplicationFont.semiBold}
  margin-top: 30px;
`;

interface Props {
  text?: string
}

export default class EmptyView extends React.Component<Props> {
  static defaultProps = {
    text: 'No favourite has been added'
  }

  render() {
    return (
      <CenteredView>
        <Image css={`height: 250; width: 250;`} source={Images.emptyScreenIcon} />
        <Title>{this.props.text}</Title>
      </CenteredView>
    )
  }

}
