import { Box } from "@chakra-ui/react";

import { StockCard } from "./components/StockCard";
import { SUPPORTED_STOCK_SYMBOLS } from "./utils/constants";


const Main = () => {
  return <Box display="flex" gap={3} p="15px">
  {
    SUPPORTED_STOCK_SYMBOLS.map((symbol) => (
      <StockCard key={symbol} symbol={symbol} />
    ))
  }
  </Box>;
}

export default Main;