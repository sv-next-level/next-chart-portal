import { createSlice } from "@reduxjs/toolkit";

import { CHART_TIME_FORMAT } from "@/chart/time/format";
import { ChartTime, INITIAL_CHART_TIME_LIST } from "@/chart/time/list";

export const newChartTimeInitialState: ChartTime = {
  star: false,
  time: 1,
  format: CHART_TIME_FORMAT.MINUTES,
};

const initialState = {
  list: INITIAL_CHART_TIME_LIST,
  chartTime: INITIAL_CHART_TIME_LIST[0],
};

export const chartTimeListSlice = createSlice({
  name: "chartTimeList",
  initialState,
  reducers: {
    chartTimeListPush: (state, action) => {
      state.list.push(action.payload);
    },
    chartTimeListStar: (state, action) => {
      for (const chartTime of state.list) {
        if (
          chartTime.time === action.payload.time &&
          chartTime.format === action.payload.format
        ) {
          chartTime.star = action.payload.star;
        }
      }
    },
    chartTimeListRemove: (state, action) => {
      let index: number = 0;
      for (const chartTime of state.list) {
        if (
          chartTime.time === action.payload.time &&
          chartTime.format === action.payload.format
        ) {
          break;
        }
        index++;
      }

      state.list.splice(index, 1);
    },
    chartTimeUpdate: (state, action) => {
      state.chartTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  chartTimeUpdate,
  chartTimeListPush,
  chartTimeListRemove,
  chartTimeListStar,
} = chartTimeListSlice.actions;

export default chartTimeListSlice.reducer;
