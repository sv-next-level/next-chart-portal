import {
  IChartApi,
  ISeriesApi,
  SeriesOptionsMap,
  Time,
} from "lightweight-charts";

import { initialState as candlestickInitialState } from "@/lib/redux/features/chart/series/candlestick";
import { initialState as lineInitialState } from "@/lib/redux/features/chart/series/line";

import { SERIES } from "@/chart/series";

export * from "./candlestick.series";
export * from "./line.series";

export const createSeries = (
  chart: IChartApi,
  seriesType: SERIES,
  style: any,
): ISeriesApi<keyof SeriesOptionsMap, Time> => {
  let series: ISeriesApi<keyof SeriesOptionsMap, Time>;

  switch (seriesType) {
    case SERIES.AREA:
      series = chart.addAreaSeries({ ...style });
      return series;
    case SERIES.BAR:
      series = chart.addBarSeries({ ...style });
      return series;
    case SERIES.BASELINE:
      series = chart.addBaselineSeries({ ...style });
      return series;
    case SERIES.CANDLESTICK:
      series = chart.addCandlestickSeries({
        ...candlestickInitialState,
        ...style,
      });
      return series;
    case SERIES.HISTOGRAM:
      series = chart.addHistogramSeries({ ...style });
      return series;
    case SERIES.LINE:
      series = chart.addLineSeries({ ...lineInitialState, ...style });
      return series;
    default:
      throw new Error(`Unsupported series type: ${seriesType}`);
  }
};
