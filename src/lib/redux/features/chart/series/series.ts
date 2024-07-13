import { createSlice } from "@reduxjs/toolkit";
import {
  AutoscaleInfoProvider,
  DeepPartial,
  LineStyle,
  LineWidth,
  PriceFormat,
  PriceLineSource,
  SeriesOptionsCommon,
} from "lightweight-charts";

import { PRICE_SCALE } from "@/chart/position";

export interface Series extends DeepPartial<SeriesOptionsCommon> {
  title: string | undefined;
  visible: DeepPartial<boolean> | undefined;
  lastValueVisible: DeepPartial<boolean> | undefined;
  autoscaleInfoProvider: DeepPartial<AutoscaleInfoProvider> | undefined;

  baseLineColor: string | undefined;
  baseLineStyle: DeepPartial<LineStyle> | undefined;
  baseLineVisible: DeepPartial<boolean> | undefined;
  baseLineWidth: DeepPartial<LineWidth> | undefined;

  priceFormat: DeepPartial<PriceFormat> | undefined;
  priceLineColor: string | undefined;
  priceLineStyle: DeepPartial<LineStyle> | undefined;
  priceLineSource: DeepPartial<PriceLineSource> | undefined;
  priceLineWidth: DeepPartial<LineWidth> | undefined;
  priceLineVisible: DeepPartial<boolean> | undefined;
  priceScaleId: DeepPartial<PRICE_SCALE> | undefined;
}

export const initialState: Series = {
  title: undefined,
  visible: true,
  lastValueVisible: true,
  // autoscaleInfoProvider: () => ({
  //   priceRange: {
  //     minValue: 55, // min value in price scale
  //     maxValue: 60, // max value in price scale
  //   },
  //   margins: {
  //     // Styling for price scale
  //     above: 10,
  //     below: 10,
  //   },
  // }),
  autoscaleInfoProvider: undefined,

  baseLineColor: "#B2B5BE",
  baseLineStyle: LineStyle.Solid,
  baseLineVisible: true,
  baseLineWidth: 1,

  priceFormat: undefined,
  priceLineColor: "",
  priceLineStyle: LineStyle.Dashed,
  priceLineSource: PriceLineSource.LastBar,
  priceLineWidth: 1,
  priceLineVisible: true,
  priceScaleId: PRICE_SCALE.RIGHT,
};

export const SeriesSlice = createSlice({
  name: "SeriesSlice",
  initialState,
  reducers: {
    setSeries: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSeries } = SeriesSlice.actions;

export default SeriesSlice.reducer;
