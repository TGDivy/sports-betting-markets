import { Card, Flex, List, Row, Skeleton, Typography } from "antd";
import { getEvents } from "api/smarkets-events/smarkets-events";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { eventType, eventTypeDomain } from "types/smarket-events";
import { useSessionStorageAPI } from "utils/hook";

type Props = {};

const getDomainInfoAndEvents = async (domain: eventTypeDomain) => {
  if (!domain) {
    throw new Error("Event domain is required");
  }

  const domainInfo = await getEvents({
    type_domain: [domain],
    type_scope: ["root"],
    include_hidden: false,
    state: ["new", "upcoming", "live"],
    limit: 5,
    sort: "display_order,start_datetime,name",
  });

  const events = await getEvents({
    type_domain: domain && [domain],
    type_scope: ["single_event"],
    include_hidden: false,
    state: ["new", "upcoming", "live"],
    limit: 5,
    sort: "display_order,start_datetime,name",
  });

  return {
    domainInfo,
    events,
  };
};

export const EventsPage = (props: Props) => {
  const { event_domain } = useParams<{ event_domain: eventTypeDomain }>();
  const [loading, setLoading] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<eventType>();
  const [categoryEvents, setCategoryEvents] = React.useState<eventType[]>();

  React.useEffect(() => {
    if (event_domain) {
      setLoading(true);
      getDomainInfoAndEvents(event_domain)
        .then(({ domainInfo, events }) => {
          setLoading(false);
          setCategoryInfo(domainInfo.events[0]);
          setCategoryEvents(events.events);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [event_domain]);

  return (
    <Flex vertical>
      <Skeleton loading={loading} active>
        <Typography.Title level={2}>{categoryInfo?.name}</Typography.Title>
        <Typography.Paragraph>{categoryInfo?.description}</Typography.Paragraph>
      </Skeleton>
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        // dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={"item.title"}>Card content</Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};
