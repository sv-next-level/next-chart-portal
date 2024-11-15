import {
  chartTimeListPush,
  chartTimeListRemove,
  chartTimeListStar,
  chartTimeUpdate,
  newChartTimeInitialState,
} from "@/lib/redux/features/chart/time";
import { useAppDispatch, useAppSelector } from "@/nextjs/lib/redux/store";

import { ChartTime } from "@/chart/time/list";

export function useChartTime() {
  const dispatch = useAppDispatch();

  const currentChartTime = useAppSelector((state) => state.chartTime);
  const pushChartTimeList = (newChartTime: ChartTime) => {
    for (const chartTime of currentChartTime.list) {
      if (
        chartTime.time === newChartTime.time &&
        chartTime.format === newChartTime.format
      ) {
        return;
      }
    }
    dispatch(chartTimeListPush(newChartTime));
  };

  const starChartTimeList = (starChartTime: ChartTime) => {
    dispatch(chartTimeListStar(starChartTime));
  };

  const removeChartTimeList = (removeChartTime: ChartTime) => {
    dispatch(chartTimeListRemove(removeChartTime));
  };

  const updateChartTime = (chartTime: ChartTime) => {
    dispatch(chartTimeUpdate(chartTime));
  };

  return {
    currentChartTime,
    newChartTimeInitialState,
    pushChartTimeList,
    removeChartTimeList,
    starChartTimeList,
    updateChartTime,
  };
}
