import {
  CandlestickData,
  ChartOptionsBase,
  createChart,
  DeepPartial,
  HorzScaleOptions,
  IChartApi,
  ISeriesApi,
  LineData,
  SeriesMarker,
  SeriesOptionsMap,
  Time,
  TimeChartOptions,
} from "lightweight-charts";

import { initialState } from "@/lib/redux/features/chart/chart";

import { CHART_INDICATOR_NAME } from "@/chart/indicator/name";
import { PRICE_SCALE } from "@/chart/position";
import { SERIES } from "@/chart/series";

import { Data } from "./data/data";
import { createIndicator, updateIndicator } from "./indicator";
import { createSeries } from "./series";

interface Indicator {
  indicator: ISeriesApi<keyof SeriesOptionsMap, Time>;
  type: CHART_INDICATOR_NAME;
}

export class Chart {
  private chart: IChartApi;
  private container: HTMLElement;
  private width: number;
  private height: number;
  private chartSeries: ISeriesApi<keyof SeriesOptionsMap, Time>;
  private borderColor: string | undefined;
  private rightOffset: number | undefined;
  private fixLeftEdge: DeepPartial<boolean> | undefined;
  private timeVisible: DeepPartial<boolean> | undefined;
  private data: Data[];
  private markers: SeriesMarker<Time>[];
  private indicators: Record<string, Indicator>;

  constructor(container: HTMLElement, series: SERIES) {
    this.container = container;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.rightOffset = 30;
    this.fixLeftEdge = false;
    this.timeVisible = true;
    this.data = [];
    this.markers = [];
    this.indicators = {};

    this.chart = createChart(this.container, initialState);

    this.chartSeries = createSeries(this.chart, series, {});
  }

  getChart(): IChartApi {
    return this.chart;
  }

  getChartSeries() {
    return this.chartSeries;
  }

  applyChartOptions(options: DeepPartial<TimeChartOptions>) {
    this.chart.applyOptions(options);
  }

  applyTimeScaleOptions(options: DeepPartial<HorzScaleOptions>) {
    this.chart.timeScale().applyOptions(options);
  }

  handleResize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    // this.chart.applyOptions({
    //   width: this.width,
    //   height: this.height,
    // });
  }

  setData(data: Data[]) {
    this.data = data;
    this.chartSeries.setData(
      this.data as CandlestickData<Time>[] & LineData<Time>[],
    );
  }

  updateData(data: Data) {
    this.data.push(data);
    this.chartSeries.update(data as CandlestickData<Time> & LineData<Time>);

    for (const indicator of Object.values(this.indicators)) {
      updateIndicator(indicator.indicator, indicator.type, {
        data: this.data,
      });
    }
  }

  setMarkers(markers: SeriesMarker<Time>[]) {
    this.markers = markers;
    this.chartSeries.setMarkers(this.markers);
  }

  setPriceScale(side: PRICE_SCALE, data: any) {
    this.chart.priceScale(side).applyOptions(data);
  }

  createIndicator(indicatorType: CHART_INDICATOR_NAME, options: any) {
    const indicator = createIndicator(this.chart, indicatorType, {
      ...options,
      data: this.data,
    });

    // this.indicators[indicator.] = {
    //   indicator: indicator,
    //   type: indicatorType,
    // };
  }
}
