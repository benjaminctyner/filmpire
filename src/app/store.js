import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMBD';
import { genreOrCategory } from '../features/currentGenreOrCategory';
import { authSlice } from '../features/auth';
import { useReducer } from 'react';

export default configureStore({
  reducer: {
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreOrCategory: genreOrCategory.reducer,
    user: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
});
