import { IChartApi } from "lightweight-charts";
import { CandlestickSeries } from "./candlestick.series";
import { LineSeries } from "./line.series";
export * from "./candlestick.series";
export * from "./line.series";

export const enum SERIES {
  AREA = "AREA",
  BAR = "BAR",
  BASELINE = "BASELINE",
  CANDLESTICK = "CANDLESTICK",
  HISTOGRAM = "HISTOGRAM",
  LINE = "LINE",
}

export const createSeries = (
  chart: IChartApi,
  seriesType: SERIES
): CandlestickSeries | LineSeries => {
  let series: any;

  switch (seriesType) {
    case SERIES.AREA:
      series = chart.addAreaSeries();
      break;
    case SERIES.BAR:
      series = chart.addBarSeries();
      break;
    case SERIES.BASELINE:
      series = chart.addBaselineSeries();
      break;
    case SERIES.CANDLESTICK:
      series = new CandlestickSeries(chart);
      break;
    case SERIES.HISTOGRAM:
      series = chart.addHistogramSeries();
      break;
    case SERIES.LINE:
      series = new LineSeries(chart);
      break;
    default:
      console.log("🚀 ~ createSeries ~ seriesType:", seriesType);
  }

  return series;
};
