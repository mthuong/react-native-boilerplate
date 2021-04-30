import * as React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { useLocalizationContext } from 'localization'
import { Searchbar } from 'react-native-paper'

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

  return (
    <Container>
      <Header title={languages.ConversationNew} backEnabled />
      {/* Search field */}
      <Searchbar value='' placeholder={languages.Search} />
    </Container>
  )
}
