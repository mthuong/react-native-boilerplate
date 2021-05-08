import { RouteProp } from '@react-navigation/native'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { TConversation, ConversationFunc } from 'models/conversation'
import { RootNavigation } from 'navigator'
import { RootStackParamList } from 'navigator/Navigator'
import { NAV_SCREENS } from 'navigator/RouteNames'
import React, { useState, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { ChatServices } from '../../../api/ChatServices'
import { useAppSelector } from 'stores/hook'
import { TMessageFunc } from 'models/Message'

// type ConversationScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   NAV_SCREENS.Conversation
// >
type ConversationScreenRoute = RouteProp<
  RootStackParamList,
  NAV_SCREENS.Conversation
>

export type ConversationScreenParams = {
  conversation: TConversation
}

type Props = {
  // navigation: ConversationScreenNavigationProp
  route: ConversationScreenRoute
}

export function ConversationScreen(props: Props) {
  const { route } = props
  const [messages, setMessages] = useState<IMessage[]>([])

  const conversation: TConversation = route.params.conversation

  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    return ChatServices.listenForMessages(conversation.id, (message) => {
      if (user) {
        ChatServices.markMessageAsRead(conversation.id, message.id, user.id)
      }
      TMessageFunc.setSender(
        message,
        ConversationFunc.findUser(conversation, message.senderId)
      )

      const newState = GiftedChat.append(messages, [
        TMessageFunc.toGiftedMessage(message),
      ])
      setMessages(newState)
    })
  }, [conversation, messages, user])

  const _onSend = (msgs: IMessage[]) => {
    if (!msgs || msgs.length === 0 || !user) {
      return
    }
    const message = messages[0]
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
        onSend={(msgs) => _onSend(msgs)}
        user={{
          _id: user.id,
        }}
      />
    </Container>
  )
}
