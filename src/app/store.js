import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMBD';
import { genreOrCategory } from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreOrCategory: genreOrCategory.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
});
