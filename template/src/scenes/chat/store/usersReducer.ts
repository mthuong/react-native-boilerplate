import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TUser } from 'models'
import { RootState } from 'stores/store'

const usersAdapter = createEntityAdapter<TUser>({
  selectId: (user) => {
    return user.id
  },
  sortComparer: (a, b) => (a.name > b.name ? 1 : -1),
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: (state, user) => {
      usersAdapter.addOne(state, user)
    },
    userReceived(state, action) {
      usersAdapter.addMany(state, action.payload)
    },
    userUpdated: usersAdapter.updateOne,
  },
})

const usersReducer = usersSlice.reducer
export default usersReducer

// Can create a set of memoized selectors based on the location of this entity state
export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
)

export const usersActions = usersSlice.actions
