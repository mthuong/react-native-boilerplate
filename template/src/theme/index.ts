import { DefaultTheme } from 'react-native-paper'
import colors from './colors'
import fonts from './fonts'
import palette from './palette'
import images from './images'
import { spacing } from './spacing'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  fonts,
  palette,
  images,
  spacing,
}

// TODO: Theme with typescript
// declare global {
//   namespace ReactNativePaper {
//     interface ThemeColors {
//       myOwnColor: string;
//     }

//     interface Theme {
//       myOwnProperty: boolean;
//     }
//   }
// }
