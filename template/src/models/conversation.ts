import { TUser, TUserFunc } from 'models/user'
import dayjs from 'dayjs'

export type TConversation = {
  id: string
  name: string
  lastMessage?: string
  createdAt: number
  updatedAt: number
  users: TUser[]
  unreadCount: number
}

function getConversationName(
  conversation: TConversation,
  currentUserId: string
) {
  if (conversation.name) {
    return conversation.name
  }
  const otherUser = conversation.users.filter((t) => t.id !== currentUserId)[0]
  if (otherUser) {
    return TUserFunc.userDisplayName(otherUser)
  }
  // FIXME: Need to fix
  return 'No name'
}

function updatedAtText(conversation: TConversation) {
  return dayjs(conversation.updatedAt).fromNow()
}

function getDefaultUnread(conversation: TConversation, currentUserId: string) {
  return conversation.users
    .filter((t) => t.id !== currentUserId)
    .map((t) => t.id)
}

function findUser(conversation: TConversation, userId: string) {
  return conversation.users.filter((t) => t.id === userId)[0]
}

function update(conversation: TConversation, newConversation: TConversation) {
  conversation.lastMessage = newConversation.lastMessage
  conversation.updatedAt = newConversation.updatedAt
}

function setUnreadCount(conversation: TConversation, count: number) {
  conversation.unreadCount = count
}

const ConversationFunc = {
  getConversationName,
  updatedAtText,
  getDefaultUnread,
  findUser,
  update,
  setUnreadCount,
}

export { ConversationFunc }
