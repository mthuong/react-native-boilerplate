import { IMessage } from 'react-native-gifted-chat'
import { TUser, TUserFunc } from './user'

export type TMessageType = 'TEXT' | 'IMAGE'
export type TMessage = {
  id: string
  createdAt: number
  content: string
  senderId: string
  type: TMessageType
  unread: string[]
  sender: TUser
}

function setSender(msg: TMessage, user: TUser) {
  msg.sender = user
}

function toGiftedMessage(msg: TMessage): IMessage {
  return {
    _id: msg.id,
    createdAt: msg.createdAt,
    text: msg.content,
    user: {
      _id: msg.sender.uid,
      name: TUserFunc.userDisplayName(msg.sender),
    },
  }
}

export const TMessageFunc = {
  setSender,
  toGiftedMessage,
}
