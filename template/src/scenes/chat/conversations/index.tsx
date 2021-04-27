import { Container } from 'components/Container'
import React, { useEffect } from 'react'
import { useAppSelector } from 'stores/hook'
import { TConversation } from 'models/conversation'
import { View } from 'react-native'
import { Text } from 'components/text'
import { Header } from 'components/Header'
import { useLocalizationContext } from 'localization'
import { ConversationList } from './components/List'
import { getConversations } from 'stores/conversations/conversationsSelectors'

export type ConversationsScreenParams = undefined

export function ConversationsScreen() {
  const user = useAppSelector((state) => state.auth.user)
  const languages = useLocalizationContext()
  const conversations = getConversations()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressConversation = (conversation: TConversation) => {
    // TODO: Go to conversation screen
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
      <Header title={languages.Conversations_Title} backEnabled />
      <ConversationList
        currentUserId={user.id}
        conversations={conversations}
        onPressConversation={onPressConversation}
      />
    </Container>
  )
}
