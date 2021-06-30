/**
 * Define generic types for register react navigation screen with default params
 */

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'

// Define Screen component type
export type ScreenComponent<
  P extends ParamListBase = ParamListBase,
  N extends keyof P = string
> = React.ComponentType<{
  route: RouteProp<P, N>
  navigation: any
}>

// Define screen type with other default function
type ScreenType<P extends ParamListBase, N extends keyof P, O extends any> = {
  screen: {
    name: N
    component: ScreenComponent<P, N>
  }
  defaultOptions?: O
  // eslint-disable-next-line no-unused-vars
  navigate: (n: NavigationProp<P>, p?: P[N]) => void

  // Add more functions here if you need
}

export function registerScreen<
  P extends ParamListBase = ParamListBase,
  N extends keyof P = string,
  O extends any = any
>(
  name: N,
  component: ScreenComponent<P, N>,
  defaultOptions?: O
): ScreenType<P, N, O> {
  return {
    screen: {
      name,
      component,
    },
    defaultOptions,
    navigate: (navigation: NavigationProp<P>, params?: P[N]) => {
      navigation.navigate({ name, params: params as P[N] })
    },
  }
}
