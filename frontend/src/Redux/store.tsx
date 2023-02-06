import { configureStore } from '@reduxjs/toolkit'
import ganglionMusicGenerationSettingsSlice from './slices/ganglionMusicGenerationSettingsSlice'
import cytonMusicGenerationSettingsSlice from './slices/cytonMusicGenerationSettingsSlice'

export const store = configureStore({
  reducer: {ganglionMusicGenerationSettingsSlice, cytonMusicGenerationSettingsSlice},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch