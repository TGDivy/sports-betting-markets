import { Alert, Flex, List, Skeleton, Typography, message } from "antd";
import { EventCard } from "components/event_card/event_card";
import React from "react";
import { useParams } from "react-router-dom";
import {
  eventType,
  eventTypeDomain,
  extendedEventType,
} from "types/smarket_events";
import { getDomainInfoAndEvents } from "./helper";

export const EventsPage = () => {
  const { event_domain } = useParams<{ event_domain: eventTypeDomain }>();
  const [loading, setLoading] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<eventType>();
  const [combinedEvents, setCombinedEvents] = React.useState<
    extendedEventType[]
  >([]);

  React.useEffect(() => {
    if (event_domain) {
      setLoading(true);
      getDomainInfoAndEvents(event_domain)
        .then(({ domainInfo, combinedEvents }) => {
          setLoading(false);
          setCategoryInfo(domainInfo.events[0]);
          setCombinedEvents(combinedEvents);
        })
        .catch((e) => {
          console.log("error", e);
          message.error("Error loading events");
          setLoading(false);
        });
    }
  }, [event_domain]);

  return (
    <Flex vertical gap={8}>
      <Skeleton loading={loading} active>
        {categoryInfo?.name && (
          <Typography.Title level={2}>{categoryInfo.name}</Typography.Title>
        )}
        {categoryInfo?.description && (
          <Typography.Paragraph>
            {categoryInfo.description}
          </Typography.Paragraph>
        )}
        {categoryInfo?.special_rules && (
          <Alert message={categoryInfo.special_rules} type="info" />
        )}
      </Skeleton>
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={combinedEvents}
        renderItem={(item) => {
          return (
            <List.Item>
              <EventCard event={item} />
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};
