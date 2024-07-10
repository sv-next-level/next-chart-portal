import ChartReducer from "@/lib/redux/features/chart/chart";
import ChartIndicatorReducer from "@/lib/redux/features/chart/indicator";
import CandlestickReducer from "@/lib/redux/features/chart/series/candlestick";
import LineReducer from "@/lib/redux/features/chart/series/line";
import SeriesReducer from "@/lib/redux/features/chart/series/series";
import ChartStyleReducer from "@/lib/redux/features/chart/style";
import ChartTimeReducer from "@/lib/redux/features/chart/time";

export const reducers = {
  chart: ChartReducer,
  chartIndicator: ChartIndicatorReducer,
  candlestick: CandlestickReducer,
  line: LineReducer,
  series: SeriesReducer,
  chartStyle: ChartStyleReducer,
  chartTime: ChartTimeReducer,
};
