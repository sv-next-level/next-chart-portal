import { IChartApi } from "lightweight-charts";
import { CandlestickSeries, LineSeries, SERIES, createSeries } from "../series";
import {
  createSimpleMovingAverage,
  updateSimpleMovingAverage,
} from "./sma.indicator";
export * from "./sma.indicator";

export const enum INDICATOR {
  SMA = "SMA",
}

export const createIndicator = (
  chart: IChartApi,
  indicatorType: INDICATOR,
  options: any
): CandlestickSeries | LineSeries => {
  let indicator: any;

  switch (indicatorType) {
    case INDICATOR.SMA: {
      indicator = createSeries(chart, SERIES.LINE);
      const smaData = createSimpleMovingAverage(
        options.data,
        options.interval,
        options.format
      );
      indicator.getSeries().setData(smaData);
      break;
    }
    default:
      console.log("🚀 ~ createIndicator ~ indicatorType:", indicatorType);
  }

  return indicator;
};

export const updateIndicator = (
  indicator: CandlestickSeries | LineSeries,
  indicatorType: INDICATOR,
  options: any
) => {
  switch (indicatorType) {
    case INDICATOR.SMA: {
      const smaData = updateSimpleMovingAverage(
        options.data.slice(-options.interval),
        options.interval,
        options.format
      );
      indicator.getSeries().update(smaData);
      break;
    }
    default:
      console.log("🚀 ~ updateIndicator ~ indicatorType:", indicatorType);
  }
};
