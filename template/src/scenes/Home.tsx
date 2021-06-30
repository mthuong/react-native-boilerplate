import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, Text, View } from 'react-native'
import { navigate } from 'navigator/RootNavigation'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch, useAppSelector } from 'stores/hook'

import { NAV_SCREENS } from '../navigator/RouteNames'

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
  const { t } = useTranslation()
  const user = useAppSelector(state => state.auth.user)

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          navigate(NAV_SCREENS.Details, { userId: user?.id || '' })
        }}
      />

      <Button
        title={t('chat:ConversationDetail')}
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
