import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Text } from 'components/Text'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { TConversation } from 'scenes/chat/models'
import { useAppSelector } from 'stores/hook'

import { getConversations } from '../store/conversationsSelectors'

import { ConversationList } from './components/List'

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

  const user = useAppSelector(state => state.auth.user)
  const { t } = useTranslation()
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
        title={t('chat:Conversations_Title')}
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
