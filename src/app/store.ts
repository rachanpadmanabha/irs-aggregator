import { configureStore } from '@reduxjs/toolkit';
import entityReducer from '@/features/entities/entitySlice';
import aggregationReducer from '@/features/aggregation/aggregationSlice';
import uiReducer from '@/features/ui/uiSlice';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';

const rootReducer = {
  entities: entityReducer,
  aggregation: aggregationReducer,
  ui: uiReducer
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware)
});

export type RootState = {
  entities: ReturnType<typeof entityReducer>;
  aggregation: ReturnType<typeof aggregationReducer>;
  ui: ReturnType<typeof uiReducer>;
};

export type AppDispatch = typeof store.dispatch;
