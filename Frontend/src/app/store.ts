import { configureStore } from '@reduxjs/toolkit';
import { bookController } from '../controllers/bookController';
import { borrowController } from '../controllers/borrowController';

export const store = configureStore({
  reducer: {
    [bookController.reducerPath]: bookController.reducer,
    [borrowController.reducerPath]: borrowController.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookController.middleware)
      .concat(borrowController.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
