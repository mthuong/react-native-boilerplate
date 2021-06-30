import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

if (Reactotron && Reactotron.setAsyncStorageHandler) {
  Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .useReactNative({
      networking: {
        // optionally, you can turn it off with false.
        ignoreUrls: /symbolicate/,
      },
    }) // add all built-in react native plugins
    .connect() // let's connect!
}

// Teach TypeScript about the bad things we want to do.
declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: {
      // Log to Reactotron.
      log: any
      // Log error to Reactotron
      error: any
    }
  }
}

/** Do Nothing. */
const noop = () => undefined

console.log

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = {
    log: Reactotron.log || noop,
    error: Reactotron.error || noop,
  }
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    log: noop,
    error: noop,
  }
}
