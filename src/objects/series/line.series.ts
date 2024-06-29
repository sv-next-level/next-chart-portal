import {
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LastPriceAnimationMode,
  LineData,
  LineSeriesOptions,
  LineStyle,
  LineType,
  LineWidth,
  PriceLineSource,
  SeriesMarker,
  Time,
  WhitespaceData,
} from "lightweight-charts";

import { PriceScale } from "@/const/chart";

export class LineSeries {
  private series: ISeriesApi<
    "Line",
    Time,
    WhitespaceData<Time> | LineData<any>,
    LineSeriesOptions,
    DeepPartial<any>
  >;
  private id: string;
  private color: string;
  private lineWidth: DeepPartial<LineWidth> | undefined;
  private priceScaleId: PriceScale;
  private lineStyle: LineStyle;
  private title: string;
  private priceLineVisible: boolean;

  constructor(chart: IChartApi) {
    this.id = "line";
    this.color = "#2962FF";
    this.lineWidth = 1;
    this.priceScaleId = PriceScale.RIGHT;
    this.lineStyle = LineStyle.Solid;
    this.title = "";
    this.priceLineVisible = true;

    this.series = chart.addLineSeries({
      color: this.color,
      lineWidth: this.lineWidth,
      priceScaleId: this.priceScaleId,
      lineStyle: this.lineStyle,
      title: this.title,
      priceLineVisible: this.priceLineVisible,
      priceLineColor: this.color,
      priceLineStyle: LineStyle.Dashed,
      priceLineWidth: this.lineWidth,
      visible: true,
      lastValueVisible: true,
      baseLineColor: "red",
      baseLineWidth: 4,
      lineType: LineType.Simple,
      lineVisible: true,
      priceLineSource: PriceLineSource.LastBar,
      pointMarkersVisible: true,
      pointMarkersRadius: 1,
      lastPriceAnimation: LastPriceAnimationMode.Continuous,
      baseLineStyle: LineStyle.Solid,
      baseLineVisible: true,
      crosshairMarkerBackgroundColor: "yellow",
      crosshairMarkerBorderColor: "red",
      crosshairMarkerBorderWidth: 5,
      crosshairMarkerRadius: 8,
      crosshairMarkerVisible: true,
      priceFormat: {
        // useless for indicators
        type: "percent",
        precision: 8,
      },
    });
  }

  getId(): string {
    return this.id;
  }

  getSeries(): ISeriesApi<
    "Line",
    Time,
    WhitespaceData<Time> | LineData<any>,
    LineSeriesOptions,
    DeepPartial<any>
  > {
    return this.series;
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  setLineWidth(lineWidth: DeepPartial<LineWidth> | undefined) {
    this.lineWidth = lineWidth;
  }

  getLineWidth(): DeepPartial<LineWidth> | undefined {
    return this.lineWidth;
  }

  setPriceScaleId(priceScaleId: PriceScale) {
    this.priceScaleId = priceScaleId;
  }

  getPriceScaleId(): PriceScale {
    return this.priceScaleId;
  }

  setLineStyle(lineStyle: LineStyle) {
    this.lineStyle = lineStyle;
  }

  getLineStyle(): LineStyle {
    return this.lineStyle;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }

  setPriceLineVisible(priceLineVisible: boolean) {
    this.priceLineVisible = priceLineVisible;
  }

  getPriceLineVisible(): boolean {
    return this.priceLineVisible;
  }

  setData(data: LineData<Time>[]) {
    this.series.setData(data);
  }

  updateData(data: LineData<Time>) {
    this.series.update(data);
  }

  setMarkers(markers: SeriesMarker<Time>[]) {
    this.series.setMarkers(markers);
  }
}
