import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_CHART_STYLE_LIST } from "@/chart/style/list";

const initialState = {
  list: INITIAL_CHART_STYLE_LIST,
  chartStyle: INITIAL_CHART_STYLE_LIST[3],
};

export const ChartStyleSlice = createSlice({
  name: "ChartStyleSlice",
  initialState,
  reducers: {
    chartStyleListStar: (state, action) => {
      for (const chartStyle of state.list) {
        if (chartStyle.name === action.payload.name) {
          chartStyle.star = action.payload.star;
        }
      }
    },
    chartStyleUpdate: (state, action) => {
      state.chartStyle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chartStyleUpdate, chartStyleListStar } = ChartStyleSlice.actions;

export default ChartStyleSlice.reducer;
