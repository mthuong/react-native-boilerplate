import React, { Component } from 'react'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native'
import EventEmitter from 'common/EventEmitter'
import { BackHandler } from 'components/BackHandler'
const { height } = Dimensions.get('window')

type LoadingHudState = {
  animation: Animated.Value
  count: number
}

type Props = {
  // Props
}
export default class LoadingHud extends Component<Props, LoadingHudState> {
  static show = () => {
    EventEmitter.notify('showHud')
  }

  static hide = () => {
    EventEmitter.notify('hideHud')
  }

  state = {
    animation: new Animated.Value(0),
    count: 0,
  }

  componentDidMount = () => {
    EventEmitter.register('showHud', this._show)
    EventEmitter.register('hideHud', this._hide)
  }

  _show = () => {
    if (this.state.count === 0) {
      this.setState({ count: 1 }, () => {
        Animated.spring(this.state.animation, {
          toValue: 1,
          useNativeDriver: false,
        }).start()
      })
    } else {
      this.setState((state: LoadingHudState) => ({ count: state.count + 1 }))
    }
  }

  _hide = () => {
    if (this.state.count <= 0) {
      return
    }
    if (this.state.count > 1) {
      this.setState((state: LoadingHudState) => ({ count: state.count - 1 }))
      return
    }
    Animated.spring(this.state.animation, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ count: 0 })
    })
  }

  render() {
    if (this.state.count === 0) {
      return null
    }
    const styles = mStyles()
    const containerAnimatedStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .5)'],
      }),
    }

    const popupAnimatedStyle = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [(height * 2) / 3, 0],
          }),
        },
      ],
    }
    return (
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <Animated.View style={[styles.popup, popupAnimatedStyle]}>
          <ActivityIndicator color='#FFF' />
        </Animated.View>
        <BackHandler disabled />
      </Animated.View>
    )
  }
}

const mStyles = () =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    popup: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
  })
