import { Flex, List, Space, Typography } from "antd";
import { competitorType } from "types/smarket_events";
import { extendedMarketType } from "types/smarket_markets";
import { randomInt } from "utils/helper_functions";

type Props = {
  markets: extendedMarketType[];
  totalVolume: number;
  numberOfMarkets: number;
  competitors: competitorType[];
};

const { Text, Title } = Typography;

// Filter all markets if their volume is 0
// However, if all markets have volume 0, then show all markets

// Make up some quotes data in this format
// {
//   "{contract_id}": {
//     "bids": [
//       {
//         "price": 1-9999,
//         "quantity": 1-9999
//       }
//     ],
//     "offers": [
//       {
//         "price": 1-9999,
//         "quantity": 1-9999
//       }
//     ]
//   },
// }

// price*	integer
// example: 5000
// maximum: 9999
// minimum: 1
// This price is in percentage basis points.
// Example: 5000 = 50%
// To convert it to decimal odds, just divide 10000 by it
// Example: 10000 / 5000 = 2.0 (decimal odds).
// This price has to conform to a valid tick on the exchange; an invalid price error will be returned if it does not.

// quantity*	integer
// example: 10000
// maximum: 18446744073709552000
// minimum: 0
// Quantity is the sum of the total pot (back+lay) in case the order is matched<br>
// The units are 1/100 of a UK penny.<br>
// Example: Quantity 500 = 0.05 GBP<br>
// To convert it to back stake, just multiply by the price and divide by 100000000<br>
// Example: 100000 (quantity) * 5000 (price) / 100000000 = 5 GBP back stake<br>
// The minimum stake is £0.05 or currency equivalent
// }]
// offers	[tick{
// price*	integer
// example: 5000
// maximum: 9999
// minimum: 1
// This price is in percentage basis points.
// Example: 5000 = 50%
// To convert it to decimal odds, just divide 10000 by it
// Example: 10000 / 5000 = 2.0 (decimal odds).
// This price has to conform to a valid tick on the exchange; an invalid price error will be returned if it does not.

// quantity*	integer
// example: 10000
// maximum: 18446744073709552000
// minimum: 0
// Quantity is the sum of the total pot (back+lay) in case the order is matched<br>
// The units are 1/100 of a UK penny.<br>
// Example: Quantity 500 = 0.05 GBP<br>
// To convert it to back stake, just multiply by the price and divide by 100000000<br>
// Example: 100000 (quantity) * 5000 (price) / 100000000 = 5 GBP back stake<br>
// The minimum stake is £0.05 or currency equivalent
// }]
// }
// Using random number generator to generate random quotes, for random keys

// const getQuotes = (contractId: string) => {

export const MarketsList = (props: Props) => {
  const { markets, numberOfMarkets, totalVolume } = props;
  const filteredMarkets = markets.filter((market) => {
    const volumeData = market.volume?.volume;
    return volumeData !== 0;
  });

  return (
    <List
      header={
        <Flex gap={8}>
          <Title level={5}>Markets</Title>
          <Space>
            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              Total Traded:
            </Text>
            <Text
              type="warning"
              style={{
                fontSize: 12,
              }}
            >
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(totalVolume)}
            </Text>
            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              Accross:
            </Text>
            <Text
              type="warning"
              style={{
                fontSize: 12,
              }}
            >
              {numberOfMarkets}
            </Text>
            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              Markets
            </Text>
          </Space>
        </Flex>
      }
      dataSource={
        filteredMarkets.length > 0 ? filteredMarkets : markets.slice(0, 3)
      }
      itemLayout="vertical"
      renderItem={(item) => {
        const { name, description, id, volume } = item;
        const volumeData = volume?.volume;

        return (
          <List.Item key={id}>
            <Flex>
              <Flex vertical>
                <Text>
                  {name} {id}
                </Text>
                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                  }}
                >
                  {description}
                </Text>

                <Space>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Traded:
                  </Text>
                  <Text
                    type="warning"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {volumeData &&
                      new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(volumeData)}
                  </Text>
                </Space>
              </Flex>
            </Flex>
          </List.Item>
        );
      }}
    />
  );
};
