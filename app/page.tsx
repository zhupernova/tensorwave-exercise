import { Box, Heading } from "@chakra-ui/react";

import { StockCard } from "./components/StockCard";
import { SUPPORTED_STOCK_SYMBOLS } from "./utils/constants";


const Main = () => {
  return <Box>
    <Heading size="4xl" mb="10px">
      Stocks
    </Heading>
    <Box display="flex" gap={3}>
      {
        SUPPORTED_STOCK_SYMBOLS.map((symbol) => (
          <StockCard key={symbol} symbol={symbol} />
        ))
      }
    </Box>
  </Box>;
}

export default Main;