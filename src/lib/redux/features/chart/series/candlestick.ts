import { createSlice } from "@reduxjs/toolkit";
import { CandlestickStyleOptions, DeepPartial } from "lightweight-charts";

import { Series, SeriesSlice } from "@/lib/redux/features/chart/series/series";

export interface Candlestick
  extends DeepPartial<CandlestickStyleOptions>,
    Series {
  upColor: string | undefined;
  downColor: string | undefined;
  borderColor: string | undefined;
  borderUpColor: string | undefined;
  borderDownColor: string | undefined;
  borderVisible: DeepPartial<boolean> | undefined;
  wickColor: string | undefined;
  wickUpColor: string | undefined;
  wickDownColor: string | undefined;
  wickVisible: DeepPartial<boolean> | undefined;
}

export const initialState: Candlestick = {
  ...SeriesSlice.getInitialState(),
  upColor: "#26a69a",
  downColor: "#ef5350",

  borderColor: "#378658",
  borderUpColor: "#26a69a",
  borderDownColor: "#26a69a",
  borderVisible: false,

  wickColor: undefined,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
  wickVisible: true,
};

export const CandlestickSeriesSlice = createSlice({
  name: "CandlestickSeriesSlice",
  initialState,
  reducers: {
    ...SeriesSlice.caseReducers,
    setCandlestick: (state, action) => {
      state = action.payload;
    },
    setUpColor: (state, action) => {
      state.upColor = action.payload;
    },
    setDownColor: (state, action) => {
      state.downColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    setBorderUpColor: (state, action) => {
      state.borderUpColor = action.payload;
    },
    setBorderDownColor: (state, action) => {
      state.borderDownColor = action.payload;
    },
    setBorderVisible: (state, action) => {
      state.borderVisible = action.payload;
    },
    setWickColor: (state, action) => {
      state.wickColor = action.payload;
    },
    setWickUpColor: (state, action) => {
      state.wickUpColor = action.payload;
    },
    setWickDownColor: (state, action) => {
      state.wickDownColor = action.payload;
    },
    setWickVisible: (state, action) => {
      state.wickVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSeries } = CandlestickSeriesSlice.actions;

export default CandlestickSeriesSlice.reducer;
