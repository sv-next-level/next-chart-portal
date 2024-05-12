/**
 * Calculate the simple moving average from stock prices.
 * @param {Array} prices - The list of prices.
 * @param {number} interval - The number of periods to calculate.
 * @return {Array} The list of SMA value.
 */

export enum OHLC {
  OPEN = "open",
  HIGH = "high",
  LOW = "low",
  CLOSE = "close",
}

export const createSimpleMovingAverage = (
  data: any[],
  interval: number,
  format: OHLC
): Array<{
  time: any;
  value: number;
}> => {
  try {
    let index = interval - 1;
    const length = data.length + 1;
    const results: number[] = [];

    const prices = data.map((price) => price[format]);

    while (index < length - 1) {
      index = index + 1;
      const intervalSlice = prices.slice(index - interval, index);
      const sum = intervalSlice.reduce((prev, curr) => prev + curr, 0);
      results.push(sum / interval);
    }

    const movingAverageData = data
      .toReversed()
      .map((price, index) => ({
        time: price.time,
        value: results[results.length - index - 1],
      }))
      .toReversed();

    return movingAverageData;
  } catch (error) {
    console.log("🚀 ~ error", error);
    return [];
  }
};

export const updateSimpleMovingAverage = (
  data: any[],
  interval: number,
  format: OHLC
): {
  time: any;
  value: number;
} => {
  try {
    let index = interval - 1;
    const length = data.length + 1;
    const results: number[] = [];

    const prices = data.map((price) => price[format]);

    while (index < length - 1) {
      index = index + 1;
      const intervalSlice = prices.slice(index - interval, index);
      const sum = intervalSlice.reduce((prev, curr) => prev + curr, 0);
      results.push(sum / interval);
    }

    const movingAverageData = data
      .toReversed()
      .map((price, index) => ({
        time: price.time,
        value: results[results.length - index - 1],
      }))
      .toReversed();

    return movingAverageData[length - 2];
  } catch (error) {
    console.log("🚀 ~ error", error);
    return {
      time: null,
      value: 0,
    };
  }
};
