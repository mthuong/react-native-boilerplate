import { ImageStyle, Platform, TextStyle, ViewStyle } from 'react-native'
import { hasNotch } from 'react-native-device-info'

import fontSizes from './fonts/sizes'

type MergeStyle = ViewStyle | ImageStyle | TextStyle

export type ShareStyle = {
  shadow: MergeStyle
  circle: (size: number) => MergeStyle
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
} as const

export const dimensions = {
  buttonHeight: 50,
  avatar: 60,
  navigation: {
    height: 50,
    leftIcon: {
      width: 60,
      fontSize: fontSizes.hg,
    },
    rightIcon: {
      width: 60,
      fontSize: fontSizes.hg,
    },
  },
  ...Platform.select({
    ios: {
      paddingBottom: hasNotch() ? 34 : 20,
      scrollViewExtraHeight: 40,
    },
    android: {
      paddingBottom: 20,
      scrollViewExtraHeight: 0,
    },
    default: {
      paddingBottom: 0,
      scrollViewExtraHeight: 20,
    },
  }),
} as const

export type Dimensions = typeof dimensions
