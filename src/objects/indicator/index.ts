import {
  IChartApi,
  ISeriesApi,
  SeriesOptionsMap,
  Time,
} from "lightweight-charts";

import { SERIES } from "@/chart/series";

import {
  createSimpleMovingAverage,
  updateSimpleMovingAverage,
} from "@/objects/indicator/sma.indicator";
import { createSeries } from "@/objects/series";
import { CHART_INDICATOR_NAME } from "@/shared/chart/ts/indicator/name";

export * from "@/objects/indicator/sma.indicator";

export const createIndicator = (
  chart: IChartApi,
  indicatorType: CHART_INDICATOR_NAME,
  options: any,
): ISeriesApi<keyof SeriesOptionsMap, Time> => {
  let indicator: ISeriesApi<keyof SeriesOptionsMap, Time>;

  switch (indicatorType) {
    case CHART_INDICATOR_NAME.MA: {
      indicator = createSeries(chart, SERIES.LINE, options);
      const smaData = createSimpleMovingAverage(
        options.data,
        options.interval,
        options.format,
      );
      indicator.setData(smaData);
      break;
    }
    default:
      throw new Error(`Unsupported indicator type: ${indicatorType}`);
  }

  return indicator;
};

export const updateIndicator = (
  indicator: ISeriesApi<keyof SeriesOptionsMap, Time>,
  indicatorType: CHART_INDICATOR_NAME,
  options: any,
): void => {
  switch (indicatorType) {
    case CHART_INDICATOR_NAME.MA: {
      const smaData = updateSimpleMovingAverage(
        options.data.slice(-options.interval),
        options.interval,
        options.format,
      );
      indicator.update(smaData);
      break;
    }
    default:
      throw new Error(`Unsupported indicator type: ${indicatorType}`);
  }
};
