import { TextStyle } from 'react-native'

const fonts = {
  regular: {
    // fontFamily: 'sans-serif',
  } as TextStyle,
  bold: {
    // fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
  } as TextStyle,
  medium: {
    // fontFamily: 'sans-serif-medium',
    fontWeight: '300',
  } as TextStyle,
  light: {
    // fontFamily: 'sans-serif-light',
    fontWeight: '200',
  } as TextStyle,
  thin: {
    // fontFamily: 'sans-serif-thin',
    fontWeight: '100',
  } as TextStyle,
} as const

export default fonts

export type Font = typeof fonts
