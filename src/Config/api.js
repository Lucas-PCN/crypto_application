export const CoinList = (start = 1, limit = 100, currency = "USD", key) =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;
