import { ImageStyle, TextStyle, ViewStyle, Platform } from 'react-native'
import { hasNotch } from 'react-native-device-info'
import fontSizes from './fonts/sizes'

type MergeStyle = ViewStyle | ImageStyle | TextStyle

export type ShareStyle = {
  shadow: MergeStyle
  // eslint-disable-next-line no-unused-vars
  circle: (size: number) => MergeStyle
  // eslint-disable-next-line no-unused-vars
  rounded: (height: number) => MergeStyle
  center: MergeStyle
}

export const sharedStyle = {
  shadow: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
    backgroundColor: '#FFF',
  },
  circle: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
  rounded: (height: number) => ({
    height,
    borderRadius: height / 2,
  }),
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export const dimensions = {
  buttonHeight: 50,
  avatar: 60,
  navigation: {
    height: 50,
    leftIcon: {
      width: 60,
      fontSize: fontSizes.huge,
    },
    rightIcon: {
      width: 60,
      fontSize: fontSizes.huge,
    },
  },
  ...Platform.select({
    ios: {
      paddingBottom: hasNotch() ? 34 : 0,
    },
    android: {
      paddingBottom: 0,
    },
    default: {
      paddingBottom: 0,
    },
  }),
}

export type Dimensions = typeof dimensions
