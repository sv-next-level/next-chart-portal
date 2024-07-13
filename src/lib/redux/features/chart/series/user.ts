import { createSlice } from "@reduxjs/toolkit";

import { CHART_INDICATOR_NAME } from "@/chart/indicator/name";
import { SERIES } from "@/chart/series";
import { CHART_STYLE_NAME } from "@/chart/style/name";

interface Style {
  type: SERIES;
  options: any;
}
interface Indicator {
  type: CHART_INDICATOR_NAME;
  options: any;
}

export interface UserSeries {
  STYLE: {
    [id in CHART_STYLE_NAME]?: Style;
  };
  INDICATOR: {
    [id: string]: Indicator;
  };
}

export const initialState: UserSeries = {
  STYLE: {
    [CHART_STYLE_NAME.CANDLES]: {
      type: SERIES.CANDLESTICK,
      options: {
        visible: true,
      },
    },
  },
  INDICATOR: {
    ma: {
      type: CHART_INDICATOR_NAME.MA,
      options: {
        title: "MA",
        interval: 8,
        format: "close",
      },
    },
  },
};

export const UserSeriesSlice = createSlice({
  name: "UserSeriesSlice",
  initialState,
  reducers: {
    setUserSeries: (state, action) => {
      state = action.payload;
    },
    addIndicator: (state, action) => {
      state.INDICATOR["dfsd"] = action.payload;
    },
    changeStyle: (state, action) => {
      state.STYLE = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIndicator, changeStyle, setUserSeries } =
  UserSeriesSlice.actions;

export default UserSeriesSlice.reducer;
