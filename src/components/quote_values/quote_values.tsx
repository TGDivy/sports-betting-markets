import { Space, Flex, Typography } from "antd";
import React from "react";
import { extendedContractType } from "types/smarket_markets";

const { Text } = Typography;
type Props = { contracts: extendedContractType[] };

export const QuoteValues = (props: Props) => {
  const { contracts } = props;
  return (
    <Space>
      {contracts.map((contract) => {
        const { name, id, bids, offers } = contract;
        const bidPrice = bids[0]?.price;
        const offerPrice = offers[0]?.price;
        // const bidQuantity = bids[0]?.quantity;
        // const offerQuantity = offers[0]?.quantity;
        // Ran out of time, but can be added later.

        return (
          <Flex vertical key={id} align="center">
            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              {name}
            </Text>
            <Space align="center">
              <div
                style={{
                  borderRadius: 2,
                  padding: 4,
                  backgroundColor: "#00B073",
                  width: 44,
                  textAlign: "center",
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {new Intl.NumberFormat("en-GB", {
                  style: "decimal",
                  maximumFractionDigits: 1,
                }).format(10000 / offerPrice)}
              </div>

              <div
                style={{
                  borderRadius: 2,
                  padding: 4,
                  backgroundColor: "#005EA6",
                  width: 44,
                  textAlign: "center",
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {new Intl.NumberFormat("en-GB", {
                  style: "decimal",
                  maximumFractionDigits: 1,
                }).format(10000 / bidPrice)}
              </div>
            </Space>
          </Flex>
        );
      })}
    </Space>
  );
};
