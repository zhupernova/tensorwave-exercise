import { Box, Heading } from "@chakra-ui/react";

import { StockCard } from "./components/StockCard";
import { SUPPORTED_STOCK_SYMBOLS } from "./utils/constants";


const Main = () => {
  return <Box>
    <Heading size="6xl" mb="10px">
    ♫These are a few of my favorite stocks♫
    </Heading>
    <Box display="flex" gap={3} flexWrap="wrap">
      {
        SUPPORTED_STOCK_SYMBOLS.map((symbol) => (
          <StockCard key={symbol} symbol={symbol} />
        ))
      }
    </Box>
  </Box>;
}

export default Main;