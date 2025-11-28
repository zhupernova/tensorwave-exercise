"use client";

import { 
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig, 
  Box,
  Heading, 
  } from "@chakra-ui/react";

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
          <Box p="60px 45px">
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
