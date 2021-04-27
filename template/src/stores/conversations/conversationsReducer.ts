import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TConversation } from 'models/conversation'
import { RootState } from 'stores/store'

const conversationsAdapter = createEntityAdapter<TConversation>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (conversation) => conversation.id,
  // Keep the "all IDs" array sorted based on book titles
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
