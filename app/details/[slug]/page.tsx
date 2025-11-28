"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Avatar, Button, Card } from "@chakra-ui/react";

import { StockTicker } from "../../components/StockTicker";
import { API } from "../../utils/api";
import { SymbolCompanyIconUrls, StockSymbol, StockData , SUPPORTED_STOCK_SYMBOLS } from '../../utils/constants';


export default function DetailsPage() {
  const { slug } = useParams();

  if (typeof slug !== "string" || !SUPPORTED_STOCK_SYMBOLS.includes(slug as StockSymbol)) {
    // how did we get here
    return null;
  }
  
  const symbol = slug as StockSymbol;

  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        {symbol}
        {/* <StockTicker symbol={symbol} symbolIcon={SymbolCompanyIconUrls[symbol]} stockData={stockData}/> */}
        {/* <Avatar.Root size="sm" shape="rounded">
          <Avatar.Image src={SymbolCompanyIconUrls[symbol]} />
          <Avatar.Fallback name={symbol} />
        </Avatar.Root>
        <Card.Title mt="2">{symbol}</Card.Title> */}
        <Card.Description>
          
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
