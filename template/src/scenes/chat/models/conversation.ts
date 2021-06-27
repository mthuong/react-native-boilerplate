import dayjs from 'dayjs'
import { TUser, TUserFunc } from 'models'

export type TConversation = {
  id: string
  conversationKey: string
  name?: string
  lastMessage?: string
  createdAt: number
  updatedAt: number
  users: TUser[]
  userIds: string[]
  unreadCount?: number
}

export const ConversationFunc = {
  getConversationName(conversation: TConversation, currentUserId: string) {
    if (conversation.name && conversation.name?.length > 0) {
      return conversation.name
    }
    const otherUser = conversation.users.filter(t => t.id !== currentUserId)[0]
    if (otherUser) {
      return TUserFunc.userDisplayName(otherUser)
    }

    return 'No name'
  },

  updatedAtText(conversation: TConversation) {
    return dayjs(conversation.updatedAt).fromNow()
  },

  getDefaultUnread(conversation: TConversation, currentUserId: string) {
    return conversation.users.filter(t => t.id !== currentUserId).map(t => t.id)
  },

  findUser(conversation: TConversation, userId: string) {
    return conversation.users.filter(t => t.id === userId)[0]
  },
}
