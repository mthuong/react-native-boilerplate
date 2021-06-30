import { Dispatch } from '@reduxjs/toolkit'
import { TUser } from 'models'
import { TConversation } from 'scenes/chat/models'
import { ChatServices } from 'scenes/chat/services/ChatServices'

import { conversationsActions } from './conversationsReducer'

let conversationAddedSubscriber: (() => void) | null = null

export const conversationsFunctions = {
  /**
   * Call this function to unsubscribe all subscriber when user logout
   */
  unsubscribe() {
    conversationAddedSubscriber && conversationAddedSubscriber()
  },

  /**
   * Call this function as soon as possible after user logged in successfully
   * @param user firebase user information
   */
  listenForConversationAdded(user: TUser | null | undefined) {
    return (dispatch: Dispatch) => {
      if (!user) {
        return
      }
      conversationAddedSubscriber && conversationAddedSubscriber()

      conversationAddedSubscriber = ChatServices.listenForConversationAdd(
        user,
        conversations => {
          // Insert conversations into store
          dispatch(conversationsActions.conversationsReceived(conversations))
        }
      )
    }
  },

  updateConversation(conversation: TConversation) {
    return (dispatch: Dispatch) => {
      dispatch(
        conversationsActions.conversationUpdated({
          id: conversation.id,
          changes: conversation,
        })
      )
    }
  },

  updateUnreadCount(conversationId: string, unreadCount: number) {
    return (dispatch: Dispatch) => {
      dispatch(
        conversationsActions.conversationUpdated({
          id: conversationId,
          changes: {
            unreadCount: unreadCount,
          },
        })
      )
    }
  },
}
