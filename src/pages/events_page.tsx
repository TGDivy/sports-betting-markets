import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Flex,
  List,
  Skeleton,
  Tooltip,
  Typography,
} from "antd";
import {
  getEventCompetitors,
  getEventMarkets,
  getEventStates,
  getEvents,
} from "api/smarkets-events/smarkets-events";
import React from "react";
import { useParams } from "react-router-dom";
import {
  competitorT,
  eventType,
  eventTypeDomain,
  extendedEventType,
  marketType,
} from "types/smarket-events";

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
    limit: 9,
    sort: "display_order,start_datetime,name",
  });

  if (!events.events.length) {
    throw new Error("No events found");
  }

  const eventsStates = await getEventStates(
    events.events.map((event) => event.id)
  );

  const eventsCompetitors = await getEventCompetitors(
    events.events.map((event) => event.id)
  );

  const eventsMarkets = await getEventMarkets(
    events.events.map((event) => event.id)
  );

  const combinedEvents = combineEventData(
    events.events,
    eventsCompetitors.competitors,
    eventsMarkets.markets,
    eventsStates
  );

  return {
    domainInfo,
    combinedEvents,
  };
};

// each of the events compettiors, markets, and states has event id field. We can use that to map the data to the events
// we can use the event id to map the data to the events

const combineEventData = (
  events: eventType[],
  eventsCompetitors: competitorT[],
  eventsMarkets: marketType[],
  eventsStates: any
) => {
  // can be optimzized later
  const combinedEvents = events.map((event) => {
    // const eventStates = eventsStates.find((eventState:any) => eventState.id === event.id);
    // it can be multiple states for the same event
    const eventCompetitors = eventsCompetitors.filter(
      (eventCompetitor) => eventCompetitor.event_id === event.id
    );
    const eventMarkets = eventsMarkets.filter(
      (eventMarket) => eventMarket.event_id === event.id
    );
    // const eventStates = eventsStates.filter(
    //   (eventState: any) => eventState.id === event.id
    // );

    return {
      ...event,
      competitors: eventCompetitors,
      markets: eventMarkets,
      states: [],
    };
  });

  console.log("combinedEvents", combinedEvents);

  return combinedEvents;
};

export const EventsPage = (props: Props) => {
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
          setLoading(false);
        });
    }
  }, [event_domain]);

  console.log("categoryInfo", categoryInfo);
  console.log("combinedEvents", combinedEvents);

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
          const { name, description, special_rules } = item;
          return (
            <List.Item>
              <Card
                title={name}
                hoverable
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
              >
                <Typography.Paragraph>{description}</Typography.Paragraph>
              </Card>
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};
