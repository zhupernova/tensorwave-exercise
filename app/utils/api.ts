import axios from 'axios';
import { StockData, CompanyData } from './constants';

// only 2 API calls we need to make right now
type ApiFunction = 'OVERVIEW' | 'TIME_SERIES_DAILY';

const getStockData = async (input: Record<string, string> & { function: ApiFunction }) => {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_ADVANTAGE_KEY;
  const _baseUrl = `https://www.alphavantage.co/query?apikey=${apiKey}`;
  const params = Object.entries(input).reduce((urlParams, [key, value]) => {
    return urlParams + `&${key}=${value}`;
  }, '');

  const data = await axios.get(_baseUrl + params);
  return data.data;
}

const API = {
  // Prefer to make API calls return parsed data using a parsing library, but settling for manual parsing for now
  getDayStockData: async (props: {
    symbol: string,
  }): Promise<StockData[]> => {
    const stockData = await getStockData({...props, ...{ function: 'TIME_SERIES_DAILY' }});
    const timeSeries: Record<string, Record<string, string>> = stockData["Time Series (Daily)"];
    return Object.entries(timeSeries).map(([dateString, stockInfo]) => {
      return {
        date: dateString,
        open: Number(stockInfo["1. open"]),
        high: Number(stockInfo["2. high"]),
        low: Number(stockInfo["3. low"]),
        close: Number(stockInfo["4. close"]),
        volume: Number(stockInfo["5. volume"]),
      }
    });
  },
  getCompany: async (props: {
    symbol: string,
  }): Promise<CompanyData> => {
    const companyData = await getStockData({...props, ...{ function: 'OVERVIEW' }});
    return {
      assetType: companyData.AssetType,
      name: companyData.Name,
      description: companyData.Description,
      exchange: companyData.Exchange,
      sector: companyData.Sector,
      industry: companyData.Industry,
      marketCap: companyData.MarketCapitalization,
    }
  }
}

export { API };