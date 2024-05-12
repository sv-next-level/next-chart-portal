import {
  CandlestickData,
  ColorType,
  CrosshairMode,
  DeepPartial,
  HorzScaleOptions,
  IChartApi,
  LineData,
  LineStyle,
  SeriesMarker,
  TickMarkType,
  Time,
  TimeChartOptions,
  createChart,
} from "lightweight-charts";
import { CandlestickSeries, LineSeries, SERIES, createSeries } from "./series";
import { HorzAlign, PriceScale, VertAlign } from "@/const/chart";
import { INDICATOR, createIndicator, updateIndicator } from "./indicator";
import { Data } from "./data/data";

interface Indicator {
  indicator: CandlestickSeries | LineSeries;
  type: INDICATOR;
  options: any;
}

export class Chart {
  private chart: IChartApi;
  private container: HTMLElement;
  private width: number;
  private height: number;
  private chartSeries: CandlestickSeries | LineSeries;
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

    this.chart = createChart(this.container, {
      width: this.width,
      height: this.height,
      layout: {
        background: { type: ColorType.Solid, color: "black" },
        textColor: "white",
      },
      grid: {
        vertLines: { color: "#444", style: LineStyle.Dashed, visible: !true },
        horzLines: { color: "#444", style: LineStyle.Dashed, visible: !true },
      },
      rightPriceScale: {
        visible: true,
      },
      leftPriceScale: {
        visible: !true,
      },
      autoSize: true,
      trackingMode: {
        exitMode: undefined,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          visible: true,
          width: 1,
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelVisible: true,
          labelBackgroundColor: "#9B7DFF",
        },
        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },
      watermark: {
        text: "My Trading Chart",
        color: "white",
        visible: true,
        fontSize: 14,
        horzAlign: HorzAlign.RIGHT,
        vertAlign: VertAlign.TOP,
        fontStyle: "italic",
        fontFamily: "BlinkMacSystemFont",
      },
      localization: {
        locale: navigator.language,
        timeFormatter: (time: number) => {
          const date = new Date(time * 1000);
          const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            // year: "2-digit",
            day: "numeric",
            weekday: "short",
            month: "short",
            second: "2-digit",
          });
          return dateFormatter.format(date);
        },
        dateFormat: "dd MMM 'yyyy", // works if timeFormatter is not provided
        priceFormatter: (price: number) => {
          return price.toFixed(2);
        },
        percentageFormatter: (percentage: number) => {
          return percentage.toFixed(2) + "%";
        },
      },
    });

    this.chartSeries = createSeries(this.chart, series);

    this.chart.timeScale().applyOptions({
      rightOffset: this.rightOffset,
      fixLeftEdge: this.fixLeftEdge,
      timeVisible: this.timeVisible,
      ticksVisible: true,
      tickMarkFormatter: (
        time: number,
        tickMarkType: TickMarkType,
        locale: string
      ) => {
        const date: Date = new Date(time * 1000);

        switch (tickMarkType) {
          case TickMarkType.Year: {
            return date.getFullYear();
          }

          case TickMarkType.Month: {
            const monthFormatter = new Intl.DateTimeFormat(locale, {
              month: "short",
            });
            return monthFormatter.format(date);
          }

          case TickMarkType.DayOfMonth: {
            return date.getDate();
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
    } as DeepPartial<HorzScaleOptions>);
  }

  getChart(): IChartApi {
    return this.chart;
  }

  getChartSeries(): any {
    return this.chartSeries.getSeries();
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
      this.data as CandlestickData<Time>[] & LineData<Time>[]
    );
  }

  updateData(data: Data) {
    this.data.push(data);
    this.chartSeries.updateData(data as CandlestickData<Time> & LineData<Time>);

    for (const indicator of Object.values(this.indicators)) {
      updateIndicator(indicator.indicator, indicator.type, {
        ...indicator.options,
        data: this.data,
      });
    }
  }

  setMarkers(markers: SeriesMarker<Time>[]) {
    this.markers = markers;
    this.chartSeries.getSeries().setMarkers(this.markers);
  }

  setPriceScale(side: PriceScale, data: any) {
    this.chart.priceScale(side).applyOptions(data);
  }

  createIndicator(indicatorType: INDICATOR, options: any) {
    const indicator = createIndicator(this.chart, indicatorType, {
      ...options,
      data: this.data,
    });

    this.indicators[indicator.getId()] = {
      indicator: indicator,
      type: indicatorType,
      options: options,
    };
  }
}
