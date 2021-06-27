import React from 'react'
import { FlatList } from 'react-native'
import { TConversation } from 'scenes/chat/models'

import { ConversationItem } from './Item'

type ConversationListProps = {
  conversations: TConversation[]
  currentUserId: string
  onPressConversation: (conversation: TConversation) => void
}

export function ConversationList(props: ConversationListProps) {
  const { conversations, currentUserId, onPressConversation } = props

  const _renderItem = ({ item: data }: { item: TConversation }) => (
    <ConversationItem
      data={data}
      conversationId={data.id}
      currentUserId={currentUserId}
      onPressConversation={onPressConversation}
    />
  )

  return <FlatList data={conversations} renderItem={_renderItem} />
}
