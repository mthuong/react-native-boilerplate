import { Dimensions } from 'react-native'
import { ScaledSheet } from 'rn-scaled-sheet'

ScaledSheet.initialize({
  deviceWidth: Dimensions.get('window').width,
  // baseWidth?: number; // width in design
  // maxScale?: number;
  // minScale?: number;
})
