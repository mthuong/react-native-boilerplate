import { IMessage } from 'react-native-gifted-chat'
import { TUser, TUserFunc } from 'models'

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

export const TMessageFunc = {
  setSender(msg: TMessage, user: TUser) {
    msg.sender = user
  },

  toGiftedMessage(msg: TMessage): IMessage {
    return {
      _id: msg.id,
      createdAt: msg.createdAt,
      text: msg.content,
      user: {
        _id: msg.sender.id,
        name: TUserFunc.userDisplayName(msg.sender),
      },
    }
  },
}
