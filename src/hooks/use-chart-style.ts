import {
  chartStyleListStar,
  chartStyleUpdate,
} from "@/lib/redux/features/chart/style";
import { useAppDispatch, useAppSelector } from "@/nextjs/lib/redux/store";

import { ChartStyle } from "@/chart/style/list";

export function useChartStyle() {
  const dispatch = useAppDispatch();

  const currentChartStyle = useAppSelector((state) => state.chartStyle);

  const starChartStyleList = (starChartStyle: ChartStyle) => {
    dispatch(chartStyleListStar(starChartStyle));
  };

  const updateChartStyle = (chartStyle: ChartStyle) => {
    dispatch(chartStyleUpdate(chartStyle));
  };

  return {
    currentChartStyle,
    starChartStyleList,
    updateChartStyle,
  };
}
