import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { storage } from '@/services/storage';
import { loadEntitiesState } from '@/features/entities/entitySlice';
import { loadAggregationState } from '@/features/aggregation/aggregationSlice';
import { loadUIState } from '@/features/ui/uiSlice';
import { invalidateAggregation } from '@/features/aggregation/aggregationSlice';

const STORAGE_KEY = 'app_state';
const DEBOUNCE_MS = 500;

let saveTimer: ReturnType<typeof setTimeout> | null = null;

interface AppState {
  entities: ReturnType<typeof import('@/features/entities/entitySlice').default>;
  aggregation: ReturnType<typeof import('@/features/aggregation/aggregationSlice').default>;
  ui: ReturnType<typeof import('@/features/ui/uiSlice').default>;
}

/**
 * Persistence middleware
 * - Saves state to storage on every change (debounced)
 * - Invalidates aggregation on entity data changes
 * - Supports cross-tab sync via BroadcastChannel
 */
export const persistenceMiddleware: Middleware = (store) => {
  // Load initial state from storage
  loadInitialState(store);
  
  // Listen for changes from other tabs
  storage.addListener((key, data) => {
    if (key === STORAGE_KEY && data) {
      const state = data as AppState;
      store.dispatch(loadEntitiesState(state.entities));
      store.dispatch(loadAggregationState(state.aggregation));
      store.dispatch(loadUIState(state.ui));
    }
  });
  
  return (next) => (action: unknown) => {
    const result = next(action);
    const typedAction = action as AnyAction;
    
    // Don't persist load actions to avoid infinite loop
    if (typedAction.type && typedAction.type.includes('load')) {
      return result;
    }
    
    // Invalidate aggregation on entity changes
    if (typedAction.type && typedAction.type.startsWith('entities/') && 
        !typedAction.type.includes('loadEntitiesState')) {
      store.dispatch(invalidateAggregation());
    }
    
    // Debounced save
    if (saveTimer) {
      clearTimeout(saveTimer);
    }
    
    saveTimer = setTimeout(() => {
      const state = store.getState() as AppState;
      storage.save(STORAGE_KEY, state).catch(error => {
        console.error('Failed to save state:', error);
      });
    }, DEBOUNCE_MS);
    
    return result;
  };
};

async function loadInitialState(store: { dispatch: (action: AnyAction) => void }) {
  try {
    const state = await storage.load<AppState>(STORAGE_KEY);
    
    if (state) {
      if (state.entities) {
        store.dispatch(loadEntitiesState(state.entities));
      }
      if (state.aggregation) {
        store.dispatch(loadAggregationState(state.aggregation));
      }
      if (state.ui) {
        store.dispatch(loadUIState(state.ui));
      }
    } else {
      // Load dummy data if no existing state
      const { dummyEntities, createDummyEntityData } = await import('@/data/dummyData');
      const entityData = createDummyEntityData();
      
      const byId: Record<string, any> = {};
      const allIds: string[] = [];
      
      dummyEntities.forEach(entity => {
        byId[entity.id] = entity;
        allIds.push(entity.id);
      });
      
      store.dispatch(loadEntitiesState({
        byId,
        allIds,
        entityData
      }));
      
      console.log('✅ Loaded dummy data with 3 entities for testing');
    }
  } catch (error) {
    console.error('Failed to load initial state:', error);
  }
}
