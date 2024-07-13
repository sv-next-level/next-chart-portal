import { createSlice } from "@reduxjs/toolkit";
import {
  ChartOptionsBase,
  ColorType,
  CrosshairMode,
  CrosshairOptions,
  DeepPartial,
  GridOptions,
  HandleScaleOptions,
  HandleScrollOptions,
  KineticScrollOptions,
  LayoutOptions,
  LineStyle,
  LocalizationOptions,
  OverlayPriceScaleOptions,
  PriceScaleMode,
  PriceScaleOptions,
  TickMarkType,
  Time,
  TimeScaleOptions,
  TrackingModeExitMode,
  TrackingModeOptions,
  WatermarkOptions,
} from "lightweight-charts";

import { HORZ_ALIGN, VERT_ALIGN } from "@/chart/position";

import { Data } from "@/objects/data/data";

export interface Chart extends DeepPartial<ChartOptionsBase> {
  autoSize: DeepPartial<boolean> | undefined;
  crosshair: DeepPartial<CrosshairOptions> | undefined;
  data: Data[];
  grid: DeepPartial<GridOptions> | undefined;
  handleScale: DeepPartial<boolean | HandleScaleOptions> | undefined;
  handleScroll: DeepPartial<boolean | HandleScrollOptions> | undefined;
  height: number | undefined;
  kineticScroll: DeepPartial<KineticScrollOptions> | undefined;
  layout: DeepPartial<LayoutOptions> | undefined;
  leftPriceScale: DeepPartial<PriceScaleOptions> | undefined;
  localization: DeepPartial<LocalizationOptions<Time>> | undefined;
  rightPriceScale: DeepPartial<PriceScaleOptions> | undefined;
  overlayPriceScales: DeepPartial<OverlayPriceScaleOptions> | undefined;
  timeScale: DeepPartial<TimeScaleOptions> | undefined;
  trackingMode: DeepPartial<TrackingModeOptions> | undefined;
  watermark: DeepPartial<WatermarkOptions> | undefined;
  width: number | undefined;
}

export const initialState: Chart = {
  autoSize: true,
  crosshair: {
    horzLine: {
      visible: true,
      labelBackgroundColor: "#4c525e",
    },
    mode: CrosshairMode.Normal,
    vertLine: {
      visible: true,
      labelBackgroundColor: "#4c525e",
    },
  },
  data: [],
  grid: {
    horzLines: {
      color: "#222",
      style: LineStyle.Solid,
      visible: true,
    },
    vertLines: {
      color: "#222",
      style: LineStyle.Solid,
      visible: true,
    },
  },
  handleScale: {
    axisDoubleClickReset: {
      price: true,
      time: true,
    },
    axisPressedMouseMove: {
      price: true,
      time: true,
    },
    mouseWheel: true,
    pinch: true,
  },
  handleScroll: {
    horzTouchDrag: true,
    mouseWheel: true,
    pressedMouseMove: true,
    vertTouchDrag: true,
  },
  height: undefined,
  kineticScroll: {
    mouse: true,
    touch: true,
  },
  layout: {
    background: {
      type: ColorType.Solid,
      color: "#09090B",
    },
    textColor: "red",
  },
  leftPriceScale: {
    alignLabels: true,
    autoScale: true,
    borderColor: "green",
    borderVisible: true,
    entireTextOnly: true,
    invertScale: false,
    minimumWidth: 0,
    mode: PriceScaleMode.Normal,
    scaleMargins: {
      bottom: 0,
      top: 0,
    },
    textColor: "red",
    ticksVisible: false,
    visible: false,
  },
  localization: {
    dateFormat: "dd MMM 'yy", // works if timeFormatter is not provided
    locale: undefined,
    percentageFormatter: (percentage: number) => {
      return percentage.toFixed(2) + "%";
    },
    priceFormatter: (price: number) => {
      return price.toFixed(2);
    },
    timeFormatter: (time: number) => {
      const date = new Date(time * 1000);
      const options: any = {
        hour: "numeric",
        minute: "numeric",
        year: "2-digit",
        day: "numeric",
        weekday: "short",
        month: "short",
        second: "2-digit",
      };
      // const dateFormatter = new Intl.DateTimeFormat(
      //   navigator.language,
      //   options,
      // );

      //   return dateFormatter.format(date);
      return date.toLocaleDateString(navigator.language, options);
    },
  },
  rightPriceScale: {
    alignLabels: true,
    autoScale: true,
    borderColor: "--primary",
    borderVisible: true,
    entireTextOnly: true,
    invertScale: false,
    minimumWidth: 0,
    mode: PriceScaleMode.Normal,
    scaleMargins: {
      bottom: 0,
      top: 0,
    },
    textColor: "red",
    ticksVisible: false,
    visible: true,
  },
  overlayPriceScales: {
    alignLabels: true,
    borderColor: "red",
    borderVisible: true,
    entireTextOnly: true,
    invertScale: !false,
    minimumWidth: 50,
    mode: PriceScaleMode.Normal,
    scaleMargins: {
      top: 20,
      bottom: 0,
    },
    textColor: "red",
    ticksVisible: true,
  },
  timeScale: {
    allowBoldLabels: true,
    allowShiftVisibleRangeOnWhitespaceReplacement: false,
    barSpacing: 6,
    borderVisible: true,
    borderColor: "green",
    fixLeftEdge: false,
    fixRightEdge: false,
    lockVisibleTimeRangeOnResize: false,
    minBarSpacing: 0.5,
    minimumHeight: 0,
    rightBarStaysOnScroll: false,
    rightOffset: 30,
    secondsVisible: true,
    shiftVisibleRangeOnNewBar: true,
    tickMarkFormatter: (
      time: number,
      tickMarkType: TickMarkType,
      locale: string,
    ): string => {
      const date: Date = new Date(time * 1000);
      switch (tickMarkType) {
        case TickMarkType.Year: {
          return date.getFullYear().toString();
        }
        case TickMarkType.Month: {
          const monthFormatter = new Intl.DateTimeFormat(locale, {
            month: "short",
          });
          return monthFormatter.format(date);
        }
        case TickMarkType.DayOfMonth: {
          return date.getDate().toString();
        }
        case TickMarkType.Time: {
          const timeFormatter = new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
          });
          return timeFormatter.format(date);
        }
        case TickMarkType.TimeWithSeconds: {
          const timeWithSecondsFormatter = new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
          return timeWithSecondsFormatter.format(date);
        }
      }
    },
    timeVisible: true,
    tickMarkMaxCharacterLength: 6,
    ticksVisible: false,
    uniformDistribution: false,
    visible: true,
  },
  trackingMode: {
    exitMode: TrackingModeExitMode.OnNextTap,
  },
  watermark: {
    visible: true,
    text: "Lightweight Chart",
    color: "#FFF",
    fontSize: 24,
    horzAlign: HORZ_ALIGN.CENTER,
    vertAlign: VERT_ALIGN.TOP,
  },
  width: undefined,
};

export const ChartSlice = createSlice({
  name: "ChartSlice",
  initialState,
  reducers: {
    setChart: (state, action) => {
      state = action.payload;
    },
    setAutoSize: (state, action) => {
      state.autoSize = action.payload;
    },
    setCrosshair: (state, action) => {
      state.crosshair = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    updateData: (state, action) => {
      state.data.push(action.payload);
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setHandleScale: (state, action) => {
      state.handleScale = action.payload;
    },
    setHandleScroll: (state, action) => {
      state.handleScroll = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setKineticScroll: (state, action) => {
      state.kineticScroll = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setLeftPriceScale: (state, action) => {
      state.leftPriceScale = action.payload;
    },
    setLocalization: (state, action) => {
      state.localization = action.payload;
    },
    setRightPriceScale: (state, action) => {
      state.rightPriceScale = action.payload;
    },
    setOverlayPriceScales: (state, action) => {
      state.overlayPriceScales = action.payload;
    },
    setTimeScale: (state, action) => {
      state.timeScale = action.payload;
    },
    setTrackingMode: (state, action) => {
      state.trackingMode = action.payload;
    },
    setWatermark: (state, action) => {
      state.watermark = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setChart,
  setAutoSize,
  setCrosshair,
  setData,
  updateData,
  setGrid,
  setHandleScale,
  setHandleScroll,
  setKineticScroll,
  setHeight,
  setLayout,
  setLeftPriceScale,
  setLocalization,
  setRightPriceScale,
  setOverlayPriceScales,
  setTimeScale,
  setTrackingMode,
  setWatermark,
  setWidth,
} = ChartSlice.actions;

export default ChartSlice.reducer;
