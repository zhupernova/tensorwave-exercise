"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { FaCaretUp, FaCaretDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Image, Text, Icon, IconButton, Table, HStack, Box, Heading, Card, Pagination, ButtonGroup, SkeletonText, DataList } from "@chakra-ui/react";

import { API } from "../../utils/api";
import { SymbolCompanyIconUrls, StockSymbol, StockData, CompanyData, SUPPORTED_STOCK_SYMBOLS } from '../../utils/constants';

const PAGE_SIZE = 10;

export default function DetailsPage() {
  const { slug } = useParams();

  const [stockData, setStockData] = useState<StockData[]>();
  const [companyData, setCompanyData] = useState<CompanyData>();
	const [page, setPage] = useState(1);

	const start = (page - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;

  useEffect(() => {
    Promise.all([
      API.getDayStockData({symbol}),
      API.getCompany({symbol}),
    ]).then(([stockData, companyData]) => {
      // grab the most recent stock data
      setStockData(stockData);
      setCompanyData(companyData);
    })
  }, []);

  if (typeof slug !== "string" || !SUPPORTED_STOCK_SYMBOLS.includes(slug as StockSymbol)) {
    // 
    return null;
  }
  
  const symbol = slug as StockSymbol;

  return (
    <Box>
      <Heading size="6xl" mb="10px">
        {symbol}
      </Heading>
      <Card.Root>
        <Card.Body gap="2">
          <Card.Title>
            <HStack >
              <Image src={SymbolCompanyIconUrls[symbol]} height="50px" fit="contain"/>
              {companyData ? <Text>{companyData.name ?? "N/A"}</Text> : <SkeletonText maxLines={1} noOfLines={1} />}
            </HStack>
          </Card.Title>
          {companyData ? 
          <Box>
            <Box py="10px">
              {companyData.description ?? "No description provided"}
            </Box>
            <DataList.Root orientation="horizontal" my="20px">
              <DataList.Item key={"assetType"}>
                <DataList.ItemLabel minWidth="150px" fontWeight="bold">Asset Type</DataList.ItemLabel>
                <DataList.ItemValue>{companyData.assetType ?? "N/A"}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={"exchange"}>
                <DataList.ItemLabel minWidth="150px" fontWeight="bold">Exchange</DataList.ItemLabel>
                <DataList.ItemValue>{companyData.exchange ?? "N/A"}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={"sector"}>
                <DataList.ItemLabel minWidth="150px" fontWeight="bold">Sector</DataList.ItemLabel>
                <DataList.ItemValue>{companyData.sector ?? "N/A"}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={"industry"}>
                <DataList.ItemLabel minWidth="150px" fontWeight="bold">Industry</DataList.ItemLabel>
                <DataList.ItemValue>{companyData.industry ?? "N/A"}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item key={"marketCap"}>
                <DataList.ItemLabel minWidth="150px" fontWeight="bold">Market Capitalization</DataList.ItemLabel>
                <DataList.ItemValue>{companyData.marketCap ? (Number(companyData.marketCap)).toLocaleString('en-US') : "N/A"}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Box>
        : <SkeletonText noOfLines={3}/>}
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Closing price</Table.ColumnHeader>
                <Table.ColumnHeader>Volume</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">% Change</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stockData 
                ? stockData.slice(start, end).map(
                  (stockInfo, i) => {
                    let percentageChangeComponent: React.ReactNode;
                    if ((stockData.length - i) > 1) {
                      const percentChange = ((stockInfo.close - stockData[i+1].close)/(stockData[i+1].close) * 100);
                      const color = percentChange === 0 ? "black": percentChange > 0 ? "ticker.up": "ticker.down";
                      percentageChangeComponent = <Box display="flex" color={color} justifyContent="end">
                        <Text>{`${percentChange.toFixed(2)}%`}</Text>
                        { percentChange > 0 
                        ? <Icon size="sm">
                            <FaCaretUp />
                           </Icon> 
                          : <Icon size="sm">
                            <FaCaretDown />
                          </Icon>
                        }
                      </Box>
                    } else {
                      percentageChangeComponent = "N/A";
                    }
                    return <Table.Row key={`${symbol}-${stockInfo.date}`}>
                      <Table.Cell>{stockInfo.date}</Table.Cell>
                      <Table.Cell>{stockInfo.close}</Table.Cell>
                      <Table.Cell>{stockInfo.volume ? (Number(stockInfo.volume)).toLocaleString('en-US') : "N/A"}</Table.Cell>
                      <Table.Cell>{percentageChangeComponent}</Table.Cell>
                    </Table.Row>
                }
                ): <Table.Row key="placeholder">
                  <Table.Cell><SkeletonText/></Table.Cell>
                  <Table.Cell><SkeletonText/></Table.Cell>
                  <Table.Cell><SkeletonText/></Table.Cell>
                  <Table.Cell><SkeletonText/></Table.Cell>
                </Table.Row>
              }
            </Table.Body>
          </Table.Root>
          <Pagination.Root 
            textAlign="center"
            count={(stockData?.length ?? 0)} 
            pageSize={PAGE_SIZE} page={page} 
            onPageChange={(event) => setPage(event.page)}
           >
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <FaChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>
              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />
              <Pagination.NextTrigger asChild>
                <IconButton>
                  <FaChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Card.Body>
      </Card.Root>

    </Box>
  );
}
