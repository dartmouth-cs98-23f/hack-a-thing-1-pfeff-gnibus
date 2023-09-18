//https://react-redux.js.org/tutorials/typescript-quick-start

import { configureStore } from '@reduxjs/toolkit'
import classesReducer from './components/classesSlice'

export const store = configureStore({
  reducer: {
    classes: classesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch