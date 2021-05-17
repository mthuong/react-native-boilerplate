import * as React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { useLocalizationContext } from 'localization'
import List from './components/List'
import { TUser } from 'models'
import { useAppSelector } from 'stores/hook'
import { getCurrentUser } from 'stores/authSelectors'
import { ChatServices } from 'scenes/chat/services/ChatServices'
import { getUsers } from '../store/usersSelectors'
import { TextInput } from 'components/TextInput'
import { ScaledSheet } from 'rn-scaled-sheet'

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

  const languages = useLocalizationContext()

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
      <Header title={languages.ConversationNew} backEnabled />
      {/* Search field */}
      <TextInput
        value={search}
        placeholder={languages.Search}
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