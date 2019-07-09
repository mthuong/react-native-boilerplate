import { observer } from 'mobx-react';
import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import { rootStore } from '../stores/RootStore';
import { styled } from '../themes';

const Container = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

@observer
export default class HudView extends React.Component<{}> {

  render() {
    if (rootStore.hudStore.isVisible) {
      return (
        <Container>
          <Animated.View style={[styles.box]}>
            <ActivityIndicator />
          </Animated.View>
        </Container>
      );
    }

    return null

  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  box: {
    backgroundColor: '#000000',
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
