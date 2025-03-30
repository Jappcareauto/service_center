import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServiceCenter } from '@/types/index';

interface ServiceCenterState {
  serviceCenters: IServiceCenter[];
  currentServiceCenter: IServiceCenter | null;
}

const initialState: ServiceCenterState = {
  serviceCenters: [],
  currentServiceCenter: null,
};

const serviceCenterSlice = createSlice({
  name: 'serviceCenters',
  initialState,
  reducers: {
    setServiceCenters: (state, action: PayloadAction<IServiceCenter[]>) => {
      state.serviceCenters = action.payload;
    },
    setCurrentServiceCenter: (state, action: PayloadAction<IServiceCenter | string>) => {
      if (typeof action.payload === 'string') {
        // If the payload is a string, find the service center by ID
        const found = state.serviceCenters.find(sc => sc.id === action.payload);
        if (found) {
          state.currentServiceCenter = found;
        }
      } else {
        state.currentServiceCenter = action.payload;
      }
    },
    clearServiceCenters: (state) => {
      state.serviceCenters = [];
      state.currentServiceCenter = null;
    },
  },
});

export const {
  setServiceCenters,
  setCurrentServiceCenter,
  clearServiceCenters,
} = serviceCenterSlice.actions;

export default serviceCenterSlice.reducer;