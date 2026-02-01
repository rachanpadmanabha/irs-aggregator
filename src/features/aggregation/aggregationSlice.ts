import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AggregationSnapshot } from '@/types/aggregation';

interface AggregationState {
  currentSnapshot: AggregationSnapshot | null;
  history: AggregationSnapshot[];
}

const initialState: AggregationState = {
  currentSnapshot: null,
  history: []
};

const MAX_HISTORY = 5;

const aggregationSlice = createSlice({
  name: 'aggregation',
  initialState,
  reducers: {
    setAggregation: (state, action: PayloadAction<AggregationSnapshot>) => {
      // Save current to history before replacing
      if (state.currentSnapshot) {
        state.history.unshift(state.currentSnapshot);
        state.history = state.history.slice(0, MAX_HISTORY);
      }
      
      state.currentSnapshot = action.payload;
    },
    
    invalidateAggregation: (state) => {
      if (state.currentSnapshot) {
        state.currentSnapshot.isValid = false;
      }
    },
    
    clearAggregation: (state) => {
      state.currentSnapshot = null;
    },
    
    clearHistory: (state) => {
      state.history = [];
    },
    
    loadAggregationState: (_state, action: PayloadAction<AggregationState>) => {
      return action.payload;
    }
  }
});

export const {
  setAggregation,
  invalidateAggregation,
  clearAggregation,
  clearHistory,
  loadAggregationState
} = aggregationSlice.actions;

export default aggregationSlice.reducer;
