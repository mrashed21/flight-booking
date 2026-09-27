import { configureStore } from "@reduxjs/toolkit";
import flightSearchReducer from "./slices/flight-search-slice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
  },
});
