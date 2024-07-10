import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_CHART_INDICATOR_LIST } from "@/chart/indicator/list";

const initialState = {
  list: INITIAL_CHART_INDICATOR_LIST,
};

export const ChartIndicatorSlice = createSlice({
  name: "ChartIndicatorSlice",
  initialState,
  reducers: {
    chartIndicatorListStar: (state, action) => {
      for (const chartIndicator of state.list) {
        if (chartIndicator.name === action.payload.name) {
          chartIndicator.star = action.payload.star;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { chartIndicatorListStar } = ChartIndicatorSlice.actions;

export default ChartIndicatorSlice.reducer;
