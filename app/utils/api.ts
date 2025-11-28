import axios from 'axios';
import { COMPANY_DATA, STOCK_DATA } from './data';

export type StockData = {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
};

// Show the company symbol, asset type, name, description, exchange,
// sector, industry and market capitalization. If any of this information is not
// available then display “N/A” instead

export type CompanyData = {
  assetType?: string,
  name?: string,
  description?: string,
  exchange?: string,
  sector?: string,
  industry?: string,
  marketCap?: string,
}

type ApiFunction = 'OVERVIEW' | 'TIME_SERIES_DAILY';


const key = 'CDVPAERJKSG3FPNR';
const getStockData = async (input: Record<string, string> & { function: ApiFunction }) => {
  console.log({env: process.env});
  const apiKey = process.env.ALPHA_ADVANTAGE_KEY;
  const _baseUrl = `https://www.alphavantage.co/query?apikey=${apiKey}`;
  const params = Object.entries(input).reduce((urlParams, [key, value]) => {
    return urlParams + `&${key}=${value}`;
  }, '');

  const data = await axios.get(_baseUrl + params);
  return data.data;
}

const API = {
  // Prefer to make this parse data using a parser, but settling for manual daman
  getDayStockData: async (props: {
    symbol: string,
  }): Promise<StockData[]> => {
    // const stockData = await getStockData({...props, ...{ function: 'TIME_SERIES_DAILY' }});
    const stockData = STOCK_DATA;
    console.log({stockData});
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
    const companyData = COMPANY_DATA;// const companyData = await getStockData({...props, ...{ function: 'OVERVIEW' }});
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