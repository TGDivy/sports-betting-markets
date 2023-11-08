import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Space, Tooltip, Typography } from "antd";
import { MarketsList } from "components/markets_list/markets_list";
import { extendedEventType } from "types/smarket_events";
import { randomInt } from "utils/helper_functions";

type Props = {
  event: extendedEventType;
};

export const EventCard = (props: Props) => {
  const { name, description, special_rules, markets, start_date, competitors } =
    props.event;
  return (
    <Card
      title={
        <Flex vertical>
          <Space>
            <Typography.Text strong>{name}</Typography.Text>
            <Typography.Text
              ellipsis
              style={{
                fontSize: 12,
              }}
            >
              {description}
            </Typography.Text>
          </Space>
          {start_date && (
            <Typography.Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              {new Date(start_date).toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography.Text>
          )}
        </Flex>
      }
      extra={
        special_rules && (
          <Tooltip title={special_rules}>
            <Typography.Text type="secondary">Rules</Typography.Text>
            <Button
              type="link"
              size="small"
              icon={<QuestionCircleOutlined />}
            />
          </Tooltip>
        )
      }
      bodyStyle={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <MarketsList
        markets={markets}
        totalVolume={randomInt(1000, 10000)}
        numberOfMarkets={randomInt(1, 50)}
        competitors={competitors}
      />
    </Card>
  );
};
