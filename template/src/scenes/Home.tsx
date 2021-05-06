import { navigate } from 'navigator/RootNavigation'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch, useAppSelector } from 'stores/hook'
import { NAV_SCREENS } from '../navigator/RouteNames'
import { useLocalizationContext } from 'localization'

// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   NAV_SCREENS.Home
// >
// type HomeScreenRoute = RouteProp<RootStackParamList, NAV_SCREENS.Home>

// type Props = {
//   navigation: HomeScreenNavigationProp
//   route: HomeScreenRoute
// }

export function HomeScreen() {
  const dispatch = useAppDispatch()
  const languages = useLocalizationContext()
  const user = useAppSelector((state) => state.auth.user)
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          navigate(NAV_SCREENS.Details, { userId: user?.uid || '' })
        }}
      />

      <Button
        title={languages.Conversations_Title}
        onPress={() => {
          navigate(NAV_SCREENS.Conversations)
        }}
      />

      <Button
        title='Logout'
        onPress={() => {
          dispatch(authAsyncActions.signOut())
        }}
      />
    </View>
  )
}

export type HomeScreenParams = undefined

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
