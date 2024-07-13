import {
  ChartOptionsBase,
  CrosshairOptions,
  DeepPartial,
  GridOptions,
  HandleScaleOptions,
  HandleScrollOptions,
  KineticScrollOptions,
  LayoutOptions,
  LocalizationOptions,
  OverlayPriceScaleOptions,
  PriceScaleOptions,
  Time,
  TimeScaleOptions,
  TrackingModeOptions,
  WatermarkOptions,
} from "lightweight-charts";

import {
  setAutoSize,
  setChart,
  setCrosshair,
  setData,
  setGrid,
  setHandleScale,
  setHandleScroll,
  setHeight,
  setKineticScroll,
  setLayout,
  setLeftPriceScale,
  setLocalization,
  setOverlayPriceScales,
  setRightPriceScale,
  setTimeScale,
  setTrackingMode,
  setWatermark,
  setWidth,
  updateData,
} from "@/lib/redux/features/chart/chart";
import { useAppDispatch, useAppSelector } from "@/nextjs/lib/redux/store";

import { Data } from "@/objects/data/data";

export function useChart() {
  const dispatch = useAppDispatch();

  const chart = useAppSelector((state) => state.chart);
  const updateChart = (chart: DeepPartial<ChartOptionsBase> | undefined) => {
    dispatch(setChart(chart));
  };

  const autoSize = useAppSelector((state) => state.chart.autoSize);
  const updateAutoSize = (autoSize: DeepPartial<boolean> | undefined) => {
    dispatch(setAutoSize(autoSize));
  };

  const crosshair = useAppSelector((state) => state.chart.crosshair);
  const updateCrosshair = (
    crosshair: DeepPartial<CrosshairOptions> | undefined,
  ) => {
    dispatch(setCrosshair(crosshair));
  };

  const data = useAppSelector((state) => state.chart.data);
  const upsertData = (data: Data[] | Data) => {
    if (Array.isArray(data)) {
      dispatch(setData(data));
    }
    dispatch(updateData(data));
  };

  const grid = useAppSelector((state) => state.chart.grid);
  const updateGrid = (grid: DeepPartial<GridOptions> | undefined) => {
    dispatch(setGrid(grid));
  };

  const handleScale = useAppSelector((state) => state.chart.handleScale);
  const updateHandleScale = (
    handleScale: DeepPartial<boolean | HandleScaleOptions> | undefined,
  ) => {
    dispatch(setHandleScale(handleScale));
  };

  const handleScroll = useAppSelector((state) => state.chart.handleScroll);
  const updateHandleScroll = (
    handleScroll: DeepPartial<boolean | HandleScrollOptions> | undefined,
  ) => {
    dispatch(setHandleScroll(handleScroll));
  };

  const height = useAppSelector((state) => state.chart.height);
  const updateHeight = (height: number | undefined) => {
    dispatch(setHeight(height));
  };

  const kineticScroll = useAppSelector((state) => state.chart.kineticScroll);
  const updateKineticScroll = (
    kineticScroll: DeepPartial<KineticScrollOptions> | undefined,
  ) => {
    dispatch(setKineticScroll(kineticScroll));
  };

  const layout = useAppSelector((state) => state.chart.layout);
  const updateLayout = (layout: DeepPartial<LayoutOptions> | undefined) => {
    dispatch(setLayout(layout));
  };

  const leftPriceScale = useAppSelector((state) => state.chart.leftPriceScale);
  const updateLeftPriceScale = (
    leftPriceScale: DeepPartial<PriceScaleOptions> | undefined,
  ) => {
    dispatch(setLeftPriceScale(leftPriceScale));
  };

  const localization = useAppSelector((state) => state.chart.localization);
  const updateLocalization = (
    localization: DeepPartial<LocalizationOptions<Time>> | undefined,
  ) => {
    dispatch(setLocalization(localization));
  };

  const overlayPriceScales = useAppSelector(
    (state) => state.chart.overlayPriceScales,
  );
  const updateOverlayPriceScales = (
    overlayPriceScales: DeepPartial<OverlayPriceScaleOptions> | undefined,
  ) => {
    dispatch(setOverlayPriceScales(overlayPriceScales));
  };

  const rightPriceScale = useAppSelector(
    (state) => state.chart.rightPriceScale,
  );
  const updateRightPriceScale = (
    rightPriceScale: DeepPartial<PriceScaleOptions> | undefined,
  ) => {
    dispatch(setRightPriceScale(rightPriceScale));
  };

  const timeScale = useAppSelector((state) => state.chart.timeScale);
  const updateTimeScale = (
    timeScale: DeepPartial<TimeScaleOptions> | undefined,
  ) => {
    dispatch(setTimeScale(timeScale));
  };

  const trackingMode = useAppSelector((state) => state.chart.trackingMode);
  const updateTrackingMode = (
    trackingMode: DeepPartial<TrackingModeOptions> | undefined,
  ) => {
    dispatch(setTrackingMode(trackingMode));
  };

  const watermark = useAppSelector((state) => state.chart.watermark);
  const updateWatermark = (
    watermark: DeepPartial<WatermarkOptions> | undefined,
  ) => {
    dispatch(setWatermark(watermark));
  };

  const width = useAppSelector((state) => state.chart.width);
  const updateWidth = (width: number | undefined) => {
    dispatch(setWidth(width));
  };

  return {
    chart,
    updateChart,
    autoSize,
    updateAutoSize,
    crosshair,
    updateCrosshair,
    data,
    upsertData,
    grid,
    updateGrid,
    handleScale,
    updateHandleScale,
    handleScroll,
    updateHandleScroll,
    height,
    updateHeight,
    kineticScroll,
    updateKineticScroll,
    layout,
    updateLayout,
    leftPriceScale,
    updateLeftPriceScale,
    localization,
    updateLocalization,
    overlayPriceScales,
    updateRightPriceScale,
    rightPriceScale,
    updateOverlayPriceScales,
    timeScale,
    updateTimeScale,
    trackingMode,
    updateTrackingMode,
    watermark,
    updateWatermark,
    width,
    updateWidth,
  };
}
