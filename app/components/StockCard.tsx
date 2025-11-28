'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Card } from "@chakra-ui/react";

import { StockTicker } from "./StockTicker";
import { API } from "../utils/api";
import { SymbolCompanyIconUrls, StockSymbol, StockData } from '../utils/constants';

const StockCard = (props: {symbol: StockSymbol}) => {
  const { symbol } = props;
  const router = useRouter();
  const [stockData, setStockData] = useState<StockData | undefined>();

  useEffect(() => {
    Promise.all([
      API.getDayStockData({symbol}),
      API.getCompany({symbol}),
    ]).then(([stockData, companyData]) => {
      // grab the most recent stock data
      setStockData(stockData[0]);
      console.log({stockData});
    })
  
  }, []);


  return (
    <Card.Root key={symbol} width="320px" onClick={() => router.push(`/details/${symbol}`)}>
      <Card.Body gap="2">
        <StockTicker symbol={symbol} symbolIcon={SymbolCompanyIconUrls[symbol]} stockData={stockData}/>
        {/* <Avatar.Root size="sm" shape="rounded">
          <Avatar.Image src={SymbolCompanyIconUrls[symbol]} />
          <Avatar.Fallback name={symbol} />
        </Avatar.Root>
        <Card.Title mt="2">{symbol}</Card.Title> */}
        <Card.Description>
          
        </Card.Description>
      </Card.Body>
    </Card.Root>
  )
};

export { StockCard };