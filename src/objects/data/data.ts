import {
  BusinessDay,
  // CandlestickData,
  // Time,
  UTCTimestamp,
} from "lightweight-charts";

export interface IData {
  // readonly timeZone: number;
  readonly time: string | number | Date;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly value: number;
  readonly volume: Number;
}

export class Data implements IData {
  readonly time: string | number | Date;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly value: number;
  readonly volume: Number;

  constructor(
    time: string | number | Date,
    open: string | number,
    high: string | number,
    low: string | number,
    close: string | number,
    volume: string | number
  ) {
    this.time = time;
    this.open = Number(open);
    this.high = Number(high);
    this.low = Number(low);
    this.close = Number(close);
    this.value = Number(close);
    this.volume = Number(volume);
  }

  getVolume(): Number {
    return this.volume;
  }

  getTime(): string | number | Date {
    return this.time;
  }

  getUTCTimestamp(): UTCTimestamp {
    return (new Date(this.time).getTime() / 1000) as UTCTimestamp;
  }

  getFullYear(): number {
    return new Date(this.time).getFullYear();
  }

  getMonth(): number {
    return Number(("0" + (new Date(this.time).getMonth() + 1)).slice(-2));
  }

  getDate(): number {
    return Number(("0" + new Date(this.time).getDate()).slice(-2));
  }

  getBusinessDay(): BusinessDay {
    return {
      year: this.getFullYear(),
      month: this.getMonth(),
      day: this.getDate(),
    };
  }
}
