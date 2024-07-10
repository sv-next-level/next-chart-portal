import { chartIndicatorListStar } from "@/lib/redux/features/chart/indicator";
import { useAppDispatch, useAppSelector } from "@/nextjs/lib/redux/store";

import { ChartIndicator } from "@/shared/chart/ts/indicator/list";

export function useChartIndicator() {
  const dispatch = useAppDispatch();

  const currentChartIndicator = useAppSelector((state) => state.chartIndicator);

  const starChartIndicatorList = (starChartIndicator: ChartIndicator) => {
    dispatch(chartIndicatorListStar(starChartIndicator));
  };

  return {
    currentChartIndicator,
    starChartIndicatorList,
  };
}
