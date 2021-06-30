import * as React from 'react'
import {
  Animated,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity as Button,
  View,
  ViewStyle,
} from 'react-native'

export type SnackbarProps = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Whether the Snackbar is currently visible.
   */
  visible: boolean
  /**
   * Label and press callback for the action button. It should contain the following properties:
   * - `label` - Label of the action button
   * - `onPress` - Callback that is called when action button is pressed.
   */
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string
  }
  /**
   * The duration for which the Snackbar is shown.
   */
  duration?: number
  /**
   * Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called.
   */
  onDismiss: () => void
  /**
   * Text content of the Snackbar.
   */
  children: React.ReactNode
  /**
   * Style for the wrapper of the snackbar
   */
  wrapperStyle?: StyleProp<ViewStyle>
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>
  ref?: React.RefObject<View>
}

const DURATION_SHORT = 4000
const DURATION_MEDIUM = 7000
const DURATION_LONG = 10000

const theme = {
  roundness: 4,
  colors: {
    // primary: '#6200ee',
    accent: '#53B175',
    // background: '#f6f6f6',
    surface: '#ffffff',
    // error: '#B00020',
    // text: '#000000',
    onSurface: '#000000dd',
  },
  animation: {
    scale: 1.0,
  },
}

/**
 * Snackbar provide brief feedback about an operation through a message at the bottom of the screen.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button, View, StyleSheet } from 'react-native';
 * import { Snackbar } from './Snackbar';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const onToggleSnackBar = () => setVisible(!visible);
 *
 *   const onDismissSnackBar = () => setVisible(false);
 *
 *   return (
 *     <View style={styles.container}>
 *       <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
 *       <Snackbar
 *         visible={visible}
 *         onDismiss={onDismissSnackBar}
 *         action={{
 *           label: 'Undo',
 *           onPress: () => {
 *             // Do something
 *           },
 *         }}>
 *         Hey there! I'm a Snackbar.
 *       </Snackbar>
 *     </View>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'space-between',
 *   },
 * });
 *
 * export default MyComponent;
 * ```
 */
const Snackbar = ({
  visible,
  action,
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
  wrapperStyle,
  style,
  ...rest
}: SnackbarProps) => {
  const { current: opacity } = React.useRef<Animated.Value>(
    new Animated.Value(0.0)
  )
  const [hidden, setHidden] = React.useState<boolean>(!visible)

  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const { scale } = theme.animation

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
      setHidden(false)
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY

          if (finished && !isInfinity) {
            hideTimeout.current = (setTimeout(
              onDismiss,
              duration
            ) as unknown) as NodeJS.Timeout
          }
        }
      })
    } else {
      // hide
      if (hideTimeout.current) clearTimeout(hideTimeout.current)

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setHidden(true)
      })
    }
  }, [visible, duration, opacity, scale, onDismiss])

  const { colors, roundness } = theme

  if (hidden) return null

  const {
    style: actionStyle,
    label: actionLabel,
    onPress: onPressAction,
    ...actionProps
  } = action || {}

  return (
    <SafeAreaView
      pointerEvents='box-none'
      style={[styles.wrapper, wrapperStyle]}>
      <Animated.View
        pointerEvents='box-none'
        accessibilityLiveRegion='polite'
        style={
          [
            styles.container,
            {
              borderRadius: roundness,
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
            { backgroundColor: colors.onSurface },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...rest}>
        <Text
          style={[
            styles.content,
            { marginRight: action ? 0 : 16, color: colors.surface },
          ]}>
          {children}
        </Text>
        {action ? (
          <Button
            onPress={event => {
              console.tron.log('onPress')
              onPressAction?.(event)
              onDismiss()
            }}
            style={[styles.button, actionStyle]}
            {...actionProps}>
            <Text style={[styles.buttonText]}>{actionLabel}</Text>
          </Button>
        ) : null}
      </Animated.View>
    </SafeAreaView>
  )
}

/**
 * Show the Snackbar for a short duration.
 */
Snackbar.DURATION_SHORT = DURATION_SHORT

/**
 * Show the Snackbar for a medium duration.
 */
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM

/**
 * Show the Snackbar for a long duration.
 */
Snackbar.DURATION_LONG = DURATION_LONG

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 4,
  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
  buttonText: {
    color: theme.colors.accent,
    fontSize: 16,
  },
})

export default Snackbar
