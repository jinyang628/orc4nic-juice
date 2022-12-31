import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postSlice";
import signInReducer from "../features/signIn/signInSlice";
import usernameReducer from "../features/signIn/usernameSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    signedIn: signInReducer,
    activeUsername: usernameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
