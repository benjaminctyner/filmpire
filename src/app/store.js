import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMBD';

export default configureStore({
  reducer: { [tmbdApi.reducerPath]: tmbdApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmbdApi.middleware),
});
