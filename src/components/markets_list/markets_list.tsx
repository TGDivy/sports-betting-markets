import { Flex, List, Space, Typography } from "antd";
import { QuoteValues } from "components/quote_values/quote_values";
import { competitorType } from "types/smarket_events";
import { extendedMarketType } from "types/smarket_markets";

type Props = {
  markets: extendedMarketType[];
  totalVolume: number;
  numberOfMarkets: number;
  competitors: competitorType[];
};

const { Text, Title } = Typography;

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
        const { name, description, id, volume, contracts } = item;
        const volumeData = volume?.volume;

        return (
          <List.Item key={id}>
            <Flex align="center" justify="space-between">
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
                {contracts?.length && contracts.length > 3 && (
                  <Space>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Total Contracts:
                    </Text>
                    <Text
                      type="warning"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {contracts?.length}
                    </Text>
                  </Space>
                )}
              </Flex>
              {contracts && <QuoteValues contracts={contracts} />}
            </Flex>
          </List.Item>
        );
      }}
    />
  );
};
