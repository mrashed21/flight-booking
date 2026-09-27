import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedType: null,
  selectedFilter: null,
  selectedFormAirPort: null,
  selectedToAirPort: null,
  selectedClassOptions: null,
  departureTime: null,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetSearchData: () => initialState,
  },
});

export const { setSearchData, resetSearchData } = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
