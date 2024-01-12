export const CoinList = (start = 1, limit = 100, currency = "USD") =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${process.env.REACT_APP_CMC_API_KEY}`;

export const SingleCoin = (id, currency = "USD") =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}&convert=${currency}&CMC_PRO_API_KEY=${process.env.REACT_APP_CMC_API_KEY}`;

export const HistoricalChart = (id, days = 365, interval = "daily", currency = "USD") =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical?id=${id}&convert=${currency}&time_start=${days}d&interval=${interval}&CMC_PRO_API_KEY=${process.env.REACT_APP_CMC_API_KEY}`;

export const TrendingCoins = (limit = 10, currency = "USD") =>
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=${currency}&sort=percent_change_24h&CMC_PRO_API_KEY=${process.env.REACT_APP_CMC_API_KEY}`;
