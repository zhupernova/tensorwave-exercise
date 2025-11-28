"use client";

import { 
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig, Box, 
  } from "@chakra-ui/react";

import { StockCard } from "./components/StockCard";
import { SUPPORTED_STOCK_SYMBOLS } from "./utils/constants";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
    semanticTokens: {
      colors: {
        ticker: {
          up: { value: "#85b53e" },
          down: { value: "#dd5e37" },
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, config);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html>
      <body>
        <ChakraProvider value={system}>
          <Box>
            {
              SUPPORTED_STOCK_SYMBOLS.map((symbol) => (
                <StockCard key={symbol} symbol={symbol} />
              ))
            }
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
