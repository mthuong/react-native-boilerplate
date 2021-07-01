import { Alert } from 'react-native'
import {
  getJSExceptionHandler,
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler'
import RNRestart from 'react-native-restart'

// For most use cases:
// registering the error handler (maybe u can do this in the index.android.js or index.ios.js)
setJSExceptionHandler((error, isFatal) => {
  // TODO: This is your custom global error handler
  // You do stuff like show an error dialog
  // or hit google analytics to track crashes
  // or hit a custom api to inform the dev team.

  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}

        We will need to restart the app.
        `,
      [
        {
          text: 'Restart',
          onPress: () => {
            RNRestart.Restart()
          },
        },
      ]
    )
  } else {
    console.log(error) // So that we can see it in the ADB logs in case of Android if needed
  }
})
// //=================================================
// // ADVANCED use case:
// const jsExceptionHandler = (error, isFatal) => {
//   // TODO: your error handler function
// }
// setJSExceptionHandler(jsExceptionHandler, true)
// // - exceptionhandler is the exception handler function
// // - allowInDevMode is an optional parameter is a boolean.
// //   If set to true the handler to be called in place of RED screen
// //   in development mode also.

// getJSExceptionHandler gives the currently set JS exception handler
const currentHandler = getJSExceptionHandler()

//For most use cases:
setNativeExceptionHandler(exceptionString => {
  // This is your custom global error handler
  // You do stuff likehit google analytics to track crashes.
  // or hit a custom api to inform the dev team.
  //NOTE: alert or showing any UI change via JS
  //WILL NOT WORK in case of NATIVE ERRORS.
})
//====================================================
// ADVANCED use case:
const nativeExceptionHandler = exceptionString => {
  // your exception handler code here
}
setNativeExceptionHandler(
  nativeExceptionHandler,
  forceAppQuit,
  executeDefaultHandler
)
// - exceptionhandler is the exception handler function
// - forceAppQuit is an optional ANDROID specific parameter that defines
//    if the app should be force quit on error.  default value is true.
//    To see usecase check the common issues section.
// - executeDefaultHandler is an optional boolean (both IOS, ANDROID)
//    It executes previous exception handlers if set by some other module.
//    It will come handy when you use any other crash analytics module along with this one
//    Default value is set to false. Set to true if you are using other analytics modules.
