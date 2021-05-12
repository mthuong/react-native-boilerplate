import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TConversation } from 'scenes/chat/models'
import { RootState } from 'stores/store'

const conversationsAdapter = createEntityAdapter<TConversation>({
  selectId: (conversation) => conversation.id,
  sortComparer: (a, b) => (a.updatedAt > b.updatedAt ? 1 : -1),
})

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: conversationsAdapter.getInitialState(),
  reducers: {
    conversationAdded: conversationsAdapter.addOne,
    conversationsReceived(state, action) {
      conversationsAdapter.upsertMany(state, action.payload)
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
