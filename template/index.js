/**
 * @format
 */

import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import './src/config/ReactotronConfig'
import './src/config/ScaledSheet'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
