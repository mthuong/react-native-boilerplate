import { conversationsSelectors } from './conversationsReducer'
import store from 'stores/store'

export const getConversations = () =>
  conversationsSelectors.selectAll(store.getState())
