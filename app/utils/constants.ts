export const SUPPORTED_STOCK_SYMBOLS = [
  'IBM',
  'NVDA',
  // 'AAPL',
  // 'GOOG',
  // 'MSFT',
  // 'AMZN',
  // 'META',
  // 'TSLA',
  // 'TSMC',
  // 'LLY',
  // 'AVGO',
  // 'WMT',
  // 'COST',
  // 'NFLX',
  // 'DIS',
] as const;

export type StockSymbol = typeof SUPPORTED_STOCK_SYMBOLS[number];


// statically steal images from wikimedia since AlphaVantage doesn't provide it
export const SymbolCompanyIconUrls: Record<StockSymbol, string> = {
  IBM: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  NVDA: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg',  
}

export type StockData = {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
};
