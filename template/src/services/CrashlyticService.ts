import fbCrashlytics from '@react-native-firebase/crashlytics'

const crashlytics = fbCrashlytics()

class CrashlyticService {
  /**
   * Throw non-fatal event on firebase crashlytic.
   * @param message
   * @param data
   */
  trackException(
    message: string,
    data?: {
      message?: string
      stack?: string
      fileName: string
      lineNumber: number
    }
  ): void {
    if (data instanceof Error) {
      crashlytics.setAttribute('error', `${data.message}`)
      crashlytics.setAttribute('stack', `${data.stack}`)
      crashlytics.setAttribute('fileName', `${data.fileName}`)
      crashlytics.setAttribute('lineNumber', `${data.lineNumber}`)
    } else {
      /* eslint-disable */
      for (let [key, value] of Object.entries(data || {})) {
        crashlytics.setAttribute(key, `${value}`)
      }
      /* eslint-enabled */
    }

    crashlytics.recordError(new Error(message || ''))
  }

  /**
   * Throw crash event. App will be crashed if perform this event.
   */
  crash() {
    if (__DEV__) {
      crashlytics.crash()
    }
  }
}

const crashlyticService = new CrashlyticService()
export default crashlyticService
