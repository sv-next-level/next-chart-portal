import {
  CandlestickData,
  CandlestickSeriesOptions,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  SeriesMarker,
  Time,
  WhitespaceData,
} from "lightweight-charts";

export class CandlestickSeries {
  private series: ISeriesApi<
    "Candlestick",
    Time,
    CandlestickData<Time> | WhitespaceData<Time>,
    CandlestickSeriesOptions,
    DeepPartial<any>
  >;
  private id: string;
  private upColor: string;
  private downColor: string;
  private wickVisible: boolean;
  private borderVisible: boolean;
  private borderColor: string;
  private borderUpColor: string;
  private borderDownColor: string;
  private wickColor: string | undefined;
  private wickUpColor: string;
  private wickDownColor: string;

  constructor(chart: IChartApi) {
    this.id = "candlestick";
    this.upColor = "#26a69a";
    this.downColor = "#ef5350";
    this.wickVisible = true;
    this.borderVisible = false;
    this.borderColor = "";
    this.borderUpColor = "";
    this.borderDownColor = "";
    this.wickColor = undefined;
    this.wickUpColor = "#26a69a";
    this.wickDownColor = "#ef5350";

    this.series = chart.addCandlestickSeries({
      upColor: this.upColor,
      downColor: this.downColor,
      wickVisible: this.wickVisible,
      borderVisible: this.borderVisible,
      borderColor: this.borderColor,
      borderUpColor: this.borderUpColor,
      borderDownColor: this.borderDownColor,
      wickColor: this.wickColor,
      wickUpColor: this.wickUpColor,
      wickDownColor: this.wickDownColor,
      // SeriesOptionsCommon
      // lastValueVisible: true,
      // title: "candle",
      // priceScaleId: PriceScale.RIGHT,
      // visible: true,
      // priceLineVisible: true,
      // priceLineSource: PriceLineSource.LastBar,
      // priceLineWidth: 4,
      // priceLineColor: "blue",
      // priceLineStyle: LineStyle.Dotted,
      // priceFormat: {
      //   type: "price",
      //   minMove: 50,
      //   precision: 50,
      // },
      // baseLineVisible: true,
      // baseLineColor: "green",
      // baseLineWidth: 4,
      // baseLineStyle: LineStyle.Solid,
      // autoscaleInfoProvider: () => ({
      //   priceRange: {
      //     minValue: 50, // min value in price scale
      //     maxValue: 5000, // max value in price scale
      //   },
      //   // Styling for price scale
      //   margins: {
      //     above: 10,
      //     below: 10,
      //   },
      // }),
    });
  }

  getId(): string {
    return this.id;
  }

  getSeries(): ISeriesApi<
    "Candlestick",
    Time,
    CandlestickData<Time> | WhitespaceData<Time>,
    CandlestickSeriesOptions,
    DeepPartial<any>
  > {
    return this.series;
  }

  setUpColor(upColor: string) {
    this.upColor = upColor;
  }

  getUpColor(): string {
    return this.upColor;
  }

  setDownColor(downColor: string) {
    this.upColor = downColor;
  }

  getDownColor(): string {
    return this.downColor;
  }

  setWickVisible(wickVisible: boolean) {
    this.wickVisible = wickVisible;
  }

  getWickVisible(): boolean {
    return this.wickVisible;
  }

  setBorderVisible(borderVisible: boolean) {
    this.wickVisible = borderVisible;
  }

  getBorderVisible(): boolean {
    return this.borderVisible;
  }

  setBorderColor(borderColor: string) {
    this.borderColor = borderColor;
  }

  getBorderColor(): string {
    return this.borderColor;
  }

  setBorderUpColor(borderUpColor: string) {
    this.borderUpColor = borderUpColor;
  }

  getBorderUpColor(): string {
    return this.borderUpColor;
  }

  setBorderDownColor(borderDownColor: string) {
    this.borderDownColor = borderDownColor;
  }

  getBorderDownColor(): string {
    return this.borderDownColor;
  }

  setWickColor(wickColor: string) {
    this.wickColor = wickColor;
  }

  getWickColor(): string | undefined {
    return this.wickColor;
  }

  setWickUpColor(wickUpColor: string) {
    this.wickUpColor = wickUpColor;
  }

  getWickUpColor(): string {
    return this.wickUpColor;
  }

  setWickDownColor(wickDownColor: string) {
    this.wickDownColor = wickDownColor;
  }

  getWickDownColor(): string {
    return this.wickDownColor;
  }

  setData(data: CandlestickData<Time>[]) {
    this.series.setData(data);
  }

  updateData(data: CandlestickData<Time>) {
    this.series.update(data);
  }

  setMarkers(markers: SeriesMarker<Time>[]) {
    this.series.setMarkers(markers);
  }
}
