import { createSlice } from "@reduxjs/toolkit";
import {
  DeepPartial,
  LastPriceAnimationMode,
  LineStyle,
  LineStyleOptions,
  LineType,
  LineWidth,
} from "lightweight-charts";

import { Series, SeriesSlice } from "@/lib/redux/features/chart/series/series";

export interface Line extends DeepPartial<LineStyleOptions>, Series {
  color: string | undefined;

  crosshairMarkerBackgroundColor: string | undefined;
  crosshairMarkerBorderColor: string | undefined;
  crosshairMarkerBorderWidth: number | undefined;
  crosshairMarkerRadius: number | undefined;
  crosshairMarkerVisible: DeepPartial<boolean> | undefined;

  lastPriceAnimation: DeepPartial<LastPriceAnimationMode> | undefined;

  lineStyle: DeepPartial<LineStyle> | undefined;
  lineType: DeepPartial<LineType> | undefined;
  lineVisible: DeepPartial<boolean> | undefined;
  lineWidth: DeepPartial<LineWidth> | undefined;

  pointMarkersRadius: DeepPartial<number | undefined>;
  pointMarkersVisible: DeepPartial<boolean> | undefined;
}

export const initialState: Line = {
  ...SeriesSlice.getInitialState(),
  color: "#2196f3",

  crosshairMarkerBackgroundColor: undefined,
  crosshairMarkerBorderColor: undefined,
  crosshairMarkerBorderWidth: 2,
  crosshairMarkerRadius: 4,
  crosshairMarkerVisible: true,

  lastPriceAnimation: LastPriceAnimationMode.Continuous,

  lineStyle: LineStyle.Solid,
  lineType: LineType.Simple,
  lineVisible: true,
  lineWidth: 3,

  pointMarkersRadius: 3,
  pointMarkersVisible: true,
};

export const LineSeriesSlice = createSlice({
  name: "LineSeriesSlice",
  initialState,
  reducers: {
    ...SeriesSlice.caseReducers,
    setLine: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = LineSeriesSlice.actions;

export default LineSeriesSlice.reducer;
