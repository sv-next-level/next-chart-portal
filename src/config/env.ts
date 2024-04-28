export const ENV = {
  PORT: String(process.env.PORT),
  APP_ENV: String(process.env.NEXT_PUBLIC_APP_ENV),
};

export const URL = {
  GATEWAY: String(process.env.NEXT_PUBLIC_API_GATEWAY),
  TRADING_DATA: String(process.env.NEXT_PUBLIC_TRADING_DATA),
};
