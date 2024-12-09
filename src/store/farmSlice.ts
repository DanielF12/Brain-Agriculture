import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Farm } from '../types';

interface FarmState {
  farms: Farm[];
}

const initialState: FarmState = {
  farms: [],
};

const farmSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {
    addFarm: (state, action: PayloadAction<Farm>) => {
      state.farms.push(action.payload);
    },
    updateFarm: (state, action: PayloadAction<Farm>) => {
      const index = state.farms.findIndex((farm) => farm.id === action.payload.id);
      if (index !== -1) {
        state.farms[index] = action.payload;
      }
    },
    deleteFarm: (state, action: PayloadAction<string>) => {
      state.farms = state.farms.filter((farm) => farm.id !== action.payload);
    },
  },
});

export const { addFarm, updateFarm, deleteFarm } = farmSlice.actions;
export default farmSlice.reducer;