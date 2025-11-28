export const SUPPORTED_STOCK_SYMBOLS = [
  'IBM',
  'NVDA',
  'AAPL',
  'GOOG',
  'MSFT',
  'AMZN',
  'META',
  'TSLA',
  'TSMC',
  'LLY',
  'AVGO',
  'WMT',
  'COST',
  'NFLX',
  'DIS',
] as const;

export type StockSymbol = typeof SUPPORTED_STOCK_SYMBOLS[number];

// statically steal images from wikimedia since AlphaVantage doesn't provide company logos
export const SymbolCompanyIconUrls: Record<StockSymbol, string> = {
  IBM: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  NVDA: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg',
  AAPL: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  GOOG: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
  MSFT: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  AMZN: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  META: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Meta_Platforms_logo.svg',
  TSLA: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
  TSMC: 'https://upload.wikimedia.org/wikipedia/en/6/63/Tsmc.svg',
  LLY: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Eli_Lilly_and_Company.svg',
  AVGO: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Broadcom_logo_%282016-present%29.svg',
  WMT: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Walmart_logo_%282025%29.svg',
  COST: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg',
  NFLX: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  DIS: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Disney_wordmark.svg',
}

export type StockData = {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
};

export type CompanyData = {
  assetType?: string,
  name?: string,
  description?: string,
  exchange?: string,
  sector?: string,
  industry?: string,
  marketCap?: string,
}
