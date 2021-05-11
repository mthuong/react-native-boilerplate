import { ChatServices } from 'api/ChatServices'
import { conversationsActions } from './conversationsReducer'
import { TUser } from 'models/user'
import { Dispatch } from '@reduxjs/toolkit'

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
        (conversations) => {
          // Insert conversations into store
          dispatch(conversationsActions.conversationsReceived(conversations))
        }
      )
    }
  },
}
