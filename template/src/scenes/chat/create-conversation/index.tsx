import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { TextInput } from 'components/TextInput'
import { TUser } from 'models'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { ScaledSheet } from 'rn-scaled-sheet'
import { ChatServices } from 'scenes/chat/services/ChatServices'
import { getCurrentUser } from 'stores/authSelectors'
import { useAppSelector } from 'stores/hook'

import { getUsers } from '../store/usersSelectors'

import List from './components/List'

type CreateConversationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.CreateConversation
>
type CreateConversationScreenRoute = RouteProp<
  RootStackParamList,
  NAV_SCREENS.CreateConversation
>

export type CreateConversationScreenParams = undefined

type Props = {
  navigation: CreateConversationScreenNavigationProp
  route: CreateConversationScreenRoute
}

export function CreateConversationScreen(props: Props) {
  const { navigation } = props

  const { t } = useTranslation()

  const users = useAppSelector(getUsers)
  const currentUser = useAppSelector(getCurrentUser)

  const [search, setSearch] = React.useState('')

  const onSearch = React.useCallback((text: string) => {
    setSearch(text)
  }, [])

  const onEndEditing = React.useCallback(() => {
    console.tron.log(search)
  }, [search])

  const onPressUser = React.useCallback(
    async (user: TUser) => {
      // User has not login yet
      if (!currentUser) {
        return
      }
      const conversation = await ChatServices.startConversation(
        currentUser,
        user
      )

      // Go to conversation detail
      navigation.navigate(NAV_SCREENS.Conversation, {
        conversation,
      })
    },
    [currentUser, navigation]
  )

  return (
    <Container>
      <Header title={t('chat:ConversationNew')} backEnabled />
      {/* Search field */}
      <TextInput
        value={search}
        placeholder={t('common:Search')}
        onChangeText={onSearch}
        onEndEditing={onEndEditing}
        style={styles.searchInput}
      />

      <List users={users} onPressUser={onPressUser} />
    </Container>
  )
}

const styles = ScaledSheet.create({
  searchInput: {
    paddingHorizontal: 16,
    height: 36,
  },
})
