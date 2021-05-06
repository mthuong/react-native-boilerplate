import { Dispatch } from '@reduxjs/toolkit'
import { ChatServices } from 'api/ChatServices'
import { usersActions } from './usersReducer'

let userAddedSubscriber: (() => void) | null = null

/**
 * Call this function to unsubscribe all subscriber when user logout
 */
export const unsubscribe = () => {
  userAddedSubscriber && userAddedSubscriber()
}

/**
 * Call this function as soon as possible after user logged in successfully
 */
export const listenForUserAdded = () => {
  return (dispatch: Dispatch) => {
    userAddedSubscriber && userAddedSubscriber()

    userAddedSubscriber = ChatServices.listenForUserAdded((users) => {
      // Insert users into store
      dispatch(usersActions.userReceived(users))
    })
  }
}
