import React, { useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { RouteProp } from '@react-navigation/native'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { RootNavigation } from 'navigator'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { ConversationFunc, TConversation } from 'scenes/chat/models'
import { getCurrentUser } from 'stores/authSelectors'
import { useAppSelector } from 'stores/hook'

import { TMessageFunc } from '../models/message'
import { ChatServices } from '../services/ChatServices'

type ConversationScreenRoute = RouteProp<
  RootStackParamList,
  NAV_SCREENS.Conversation
>

export type ConversationScreenParams = {
  conversation: TConversation
}

type Props = {
  route: ConversationScreenRoute
}

export function ConversationScreen(props: Props) {
  const { route } = props
  const [messages, setMessages] = useState<IMessage[]>([])

  const conversation: TConversation = route.params.conversation

  const user = useAppSelector(getCurrentUser)

  useEffect(() => {
    return ChatServices.listenForMessages(conversation, message => {
      if (user) {
        ChatServices.markMessageAsRead(conversation.id, message.id, user.id)
      }
      TMessageFunc.setSender(
        message,
        ConversationFunc.findUser(conversation, message.senderId)
      )

      setMessages(oldMessages => {
        const newState = GiftedChat.append(oldMessages, [
          TMessageFunc.toGiftedMessage(message),
        ])
        return newState
      })
    })
  }, [conversation, user])

  const _onSend = (msgs: IMessage[]) => {
    if (!msgs || msgs.length === 0 || !user) {
      return
    }

    const message = msgs[0]
    ChatServices.sendMessage(
      conversation.id,
      user.id,
      message.text,
      'TEXT',
      ConversationFunc.getDefaultUnread(conversation, user.id)
    )
  }

  if (!user) {
    return null
  }

  return (
    <Container>
      <Header
        leftIcon='arrow_back_ios'
        onPressLeft={RootNavigation.back}
        title='Chat'
      />
      <GiftedChat
        messages={messages}
        onSend={msgs => _onSend(msgs)}
        user={{
          _id: user.id,
        }}
      />
    </Container>
  )
}
