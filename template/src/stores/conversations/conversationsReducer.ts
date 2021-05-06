import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TConversation } from 'models/conversation'
import { RootState } from 'stores/store'

const conversationsAdapter = createEntityAdapter<TConversation>({
  selectId: (conversation) => conversation.id,
  sortComparer: (a, b) => (a.updatedAt > b.updatedAt ? 1 : -1),
})

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: conversationsAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    conversationAdded: conversationsAdapter.addOne,
    conversationsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      conversationsAdapter.setAll(state, action.payload.conversations)
    },
    conversationUpdated: conversationsAdapter.updateOne,
  },
})

const conversationsReducer = conversationsSlice.reducer
export default conversationsReducer

// Can create a set of memoized selectors based on the location of this entity state
export const conversationsSelectors = conversationsAdapter.getSelectors<RootState>(
  (state) => state.conversations
)

export const conversationsActions = conversationsSlice.actions
