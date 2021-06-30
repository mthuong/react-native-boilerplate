import { Dispatch } from '@reduxjs/toolkit'
import { TUser } from 'models'
import { ChatServices } from 'scenes/chat/services/ChatServices'

import { usersActions } from './usersReducer'

let userAddedSubscriber: (() => void) | null = null

export const usersFunctions = {
  /**
   * Call this function to unsubscribe all subscriber when user logout
   */
  unsubscribe() {
    userAddedSubscriber && userAddedSubscriber()
  },

  /**
   * Call this function as soon as possible after user logged in successfully
   */
  listenForUserAdded(currentUser: TUser | undefined) {
    return (dispatch: Dispatch) => {
      if (!currentUser) {
        return
      }

      userAddedSubscriber && userAddedSubscriber()

      userAddedSubscriber = ChatServices.listenForUserAdded(
        currentUser,
        users => {
          // Insert users into store
          dispatch(usersActions.userReceived(users))
        }
      )
    }
  },
}
