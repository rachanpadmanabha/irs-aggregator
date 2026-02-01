import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  selectedEntityId: string | null;
  selectedLineNumber: number | null;
  isGeneratingReport: boolean;
  taxYear: number;
}

const currentYear = new Date().getFullYear();

const initialState: UIState = {
  selectedEntityId: null,
  selectedLineNumber: null,
  isGeneratingReport: false,
  taxYear: currentYear
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedEntity: (state, action: PayloadAction<string | null>) => {
      state.selectedEntityId = action.payload;
    },
    
    setSelectedLine: (state, action: PayloadAction<number | null>) => {
      state.selectedLineNumber = action.payload;
    },
    
    setIsGeneratingReport: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingReport = action.payload;
    },
    
    setTaxYear: (state, action: PayloadAction<number>) => {
      state.taxYear = action.payload;
    },
    
    loadUIState: (_state, action: PayloadAction<UIState>) => {
      return action.payload;
    }
  }
});

export const {
  setSelectedEntity,
  setSelectedLine,
  setIsGeneratingReport,
  setTaxYear,
  loadUIState
} = uiSlice.actions;

export default uiSlice.reducer;
