import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Text } from 'components/Text'
import { useLocalizationContext } from 'localization'
import { TConversation } from 'scenes/chat/models'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import React from 'react'
import { View } from 'react-native'
import { useAppSelector } from 'stores/hook'
import { ConversationList } from './components/List'
import { getConversations } from '../store/conversationsSelectors'

type ConversationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.Conversations
>
type ConversationsScreenRoute = RouteProp<
  RootStackParamList,
  NAV_SCREENS.Conversations
>

type Props = {
  navigation: ConversationsScreenNavigationProp
  route: ConversationsScreenRoute
}

export type ConversationsScreenParams = undefined

export function ConversationsScreen(props: Props) {
  const { navigation } = props

  const user = useAppSelector((state) => state.auth.user)
  const languages = useLocalizationContext()
  const conversations = useAppSelector(getConversations)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressConversation = (conversation: TConversation) => {
    // Go to conversation screen
    navigation.navigate(NAV_SCREENS.Conversation, { conversation })
  }

  const onPressNewConversation = () => {
    navigation.navigate(NAV_SCREENS.CreateConversation)
  }

  if (!user) {
    // Need to login to firebase before goto Conversations screen
    return (
      <View>
        <Text text='XD' />
      </View>
    )
  }

  return (
    <Container>
      <Header
        title={languages.Conversations_Title}
        backEnabled
        rightIcon='comment-o'
        onPressRight={onPressNewConversation}
      />
      <ConversationList
        currentUserId={user.id}
        conversations={conversations}
        onPressConversation={onPressConversation}
      />
    </Container>
  )
}