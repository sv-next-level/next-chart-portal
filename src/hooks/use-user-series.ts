"use client";

import {
  addIndicator,
  changeStyle,
  setUserSeries,
} from "@/lib/redux/features/chart/series/user";
import { useAppDispatch, useAppSelector } from "@/nextjs/lib/redux/store";

export function useUserSeries() {
  const dispatch = useAppDispatch();

  const currentUserSeries = useAppSelector((state) => state.userSeries);

  const updateUserSeries = (seriesData: any) => {
    dispatch(setUserSeries(seriesData));
  };
  const createIndicator = (seriesData: any) => {
    dispatch(addIndicator(seriesData));
  };
  const updateStyle = (seriesData: any) => {
    dispatch(changeStyle(seriesData));
  };

  return {
    currentUserSeries,
    createIndicator,
    updateStyle,
    updateUserSeries,
  };
}
