import { DefaultTheme } from 'react-native-paper'
import colors from './colors'

export * from './colors'
export * from './fonts/index'
export * from './palette'
export * from './images'
export * from './spacing'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
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
