import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';


interface Props {
  name: string
  size?: number
  style?: string
  color?: string
  onPress?: () => void
}

export default class TouchableIcon extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} css={this.props.style} onPress={this.props.onPress}>
        <Icon name={this.props.name} color={this.props.color} size={this.props.size} />
      </TouchableOpacity>
    );
  }
}
