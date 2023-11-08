import {
  getEvents,
  getEventStates,
  getEventCompetitors,
  getEventMarkets,
} from "api/smarkets_events/smarkets_events";
import {
  getMarketContracts,
  getMarketQuotes,
  getMarketVolumes,
} from "api/smarkets_markets/smarkets_markets";
import {
  eventTypeDomain,
  eventType,
  competitorType,
} from "types/smarket_events";
import {
  marketType,
  volumentType,
  extendedMarketType,
  contractType,
  marketQuotes,
  extendedContractType,
} from "types/smarket_markets";

export const getDomainInfoAndEvents = async (domain: eventTypeDomain) => {
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
    return {
      domainInfo,
      combinedEvents: [],
    };
  }

  const eventIds = events.events.map((event) => event.id);

  const eventsStates = await getEventStates(eventIds);
  const eventsCompetitors = await getEventCompetitors(eventIds);
  const eventsMarkets = await getEventMarkets(eventIds);

  const marketIds = eventsMarkets.markets.map((market) => market.id);

  const marketsVolumes = await getMarketVolumes(marketIds);
  const marketContracts = await getMarketContracts(marketIds);
  const marketQuotes = await getMarketQuotes(marketIds);

  const combinedContracts = combineContractPrices(
    marketContracts.contracts,
    marketQuotes
  );

  const combinedMarketData = combineMarketData(
    eventsMarkets.markets,
    marketsVolumes.volumes,
    combinedContracts
  );

  const combinedEvents = combineEventData(
    events.events,
    eventsCompetitors.competitors,
    combinedMarketData,
    eventsStates
  );

  return {
    domainInfo,
    combinedEvents,
  };
};

const combineContractPrices = (
  contracts: contractType[],
  marketQuotes: marketQuotes
): extendedContractType[] => {
  // can be optimzized later
  const combinedContracts = contracts.map((contract) => {
    const contractQuotes = marketQuotes[contract.id];

    return {
      ...contract,
      bids: contractQuotes.bids,
      offers: contractQuotes.offers,
    };
  });

  return combinedContracts;
};

const combineMarketData = (
  eventsMarkets: marketType[],
  marketsVolumes: volumentType[],
  contracts: extendedContractType[]
) => {
  // can be optimzized later
  const combinedEvents = eventsMarkets.map((eventMarket) => {
    const marketVolume = marketsVolumes.find(
      (marketVolume) => marketVolume.market_id === eventMarket.id
    );
    const marketContracts = contracts.filter(
      (contract) => contract.market_id === eventMarket.id
    );

    return {
      ...eventMarket,
      volume: marketVolume,
      contracts: marketContracts,
    };
  });

  return combinedEvents;
};

const combineEventData = (
  events: eventType[],
  eventsCompetitors: competitorType[],
  eventsMarkets: extendedMarketType[],
  eventsStates: any
) => {
  // can be optimzized later
  const combinedEvents = events.map((event) => {
    const eventCompetitors = eventsCompetitors.filter(
      (eventCompetitor) => eventCompetitor.event_id === event.id
    );
    const eventMarkets = eventsMarkets.filter(
      (eventMarket) => eventMarket.event_id === event.id
    );
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
