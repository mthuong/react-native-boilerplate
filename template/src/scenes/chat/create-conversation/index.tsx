import * as React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { useLocalizationContext } from 'localization'
import { Searchbar } from 'react-native-paper'
import List from './components/List'
import { getUsers } from 'stores/conversations/usersSelectors'
import { TUser } from 'models/user'
import { useAppSelector } from 'stores/hook'

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
  const languages = useLocalizationContext()
  const users = useAppSelector(getUsers)

  const [search, setSearch] = React.useState('')

  const onSearch = React.useCallback((text: string) => {
    setSearch(text)
  }, [])

  const onEndEditing = React.useCallback(() => {
    console.tron.log(search)
  }, [search])

  const onPressUser = React.useCallback((user: TUser) => {
    console.tron.log(user)
  }, [])

  return (
    <Container>
      <Header title={languages.ConversationNew} backEnabled />
      {/* Search field */}
      <Searchbar
        value={search}
        placeholder={languages.Search}
        onChangeText={onSearch}
        onEndEditing={onEndEditing}
      />

      <List users={users} onPressUser={onPressUser} />
    </Container>
  )
}
