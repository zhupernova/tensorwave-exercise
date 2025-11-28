'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@chakra-ui/react";

import { StockTicker } from "./StockTicker";
import { API } from "../utils/api";
import { SymbolCompanyIconUrls, StockSymbol, StockData } from '../utils/constants';

const StockCard = (props: {symbol: StockSymbol}) => {
  const { symbol } = props;
  const router = useRouter();
  const [stockData, setStockData] = useState<StockData | undefined>();

  useEffect(() => {
    API.getDayStockData({symbol}).then((stockData) => {
      // grab the most recent stock data
      setStockData(stockData[0]);
    })
  }, []);

  return (
    <Card.Root key={symbol} width="340px" cursor="pointer" onClick={() => router.push(`/details/${symbol}`)}>
      <Card.Body gap="2">
        <StockTicker symbol={symbol} symbolIcon={SymbolCompanyIconUrls[symbol]} stockData={stockData}/>
      </Card.Body>
    </Card.Root>
  )
};

export { StockCard };