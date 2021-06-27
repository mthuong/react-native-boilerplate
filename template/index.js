/**
 * @format
 */

import 'proxy-polyfill'
import 'react-native-gesture-handler'
import './src/config/ReactotronConfig'
import './src/config/ScaledSheet'
import './src/config/config'

import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
