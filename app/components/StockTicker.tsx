import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Avatar, Image, Box, Text, Icon, SkeletonText, HStack } from "@chakra-ui/react";

import { StockSymbol, StockData } from '../utils/constants';

const StockTicker = (props: {symbol: StockSymbol, symbolIcon: string, stockData?: StockData}) => {
  const { symbol, symbolIcon, stockData } = props;

  const tickPositive = stockData ? (stockData.close - stockData.open) > 0 : false;
  const tickerColor = tickPositive ? "ticker.up": "ticker.down";
  return (
    <Box>
      <Box display="flex" height="50px">
        {stockData 
          ? <HStack color={tickerColor}>
            <Image src={symbolIcon} height="50px" width="50px" fit="contain"/>
            <Text color="black" fontWeight="bold">{symbol}</Text>
            <Text>{(Math.floor(stockData.volume/100)/10.00)+ "k"}</Text>
             <Text>{stockData.close}</Text>
             {tickPositive ? 
               <Icon size="sm">
                <FaCaretUp />
               </Icon> 
              : <Icon size="sm">
                <FaCaretDown />
              </Icon>
            }
             <Text>{Math.abs(stockData.close - stockData.open).toFixed(2)}</Text>
          </HStack>
          : <SkeletonText />
         }

      </Box>
    </Box>
  )
};

export { StockTicker };