import { extendedMarketType } from "./smarket_markets";

export type eventState =
  | "new"
  | "upcoming"
  | "live"
  | "ended"
  | "settled"
  | "cancelled"
  | "suspended";

export type eventTypeDomain =
  | "accumulator"
  | "american_football"
  | "australian_rules"
  | "baseball"
  | "basketball"
  | "basketball_esports"
  | "boxing"
  | "call_of_duty"
  | "chess"
  | "cricket"
  | "csgo"
  | "current_affairs"
  | "cycling"
  | "darts"
  | "dota_2"
  | "esports"
  | "football"
  | "football_esports"
  | "golf"
  | "greyhound_racing"
  | "handball"
  | "horse_racing"
  | "ice_hockey"
  | "league_of_legends"
  | "mma"
  | "motorsports"
  | "olympics"
  | "poker"
  | "politics"
  | "rowing"
  | "rugby_league"
  | "rugby_union"
  | "sailing"
  | "snooker"
  | "tv_and_entertainment"
  | "table_tennis"
  | "tennis"
  | "volleyball"
  | "winter_sports";

export type eventTypeScope =
  | "root"
  | "round"
  | "category_root"
  | "category"
  | "single_event"
  | "acca_root"
  | "acca_category"
  | "acca"
  | "outright_root"
  | "outright_category"
  | "outright"
  | "tour"
  | "antepost_root"
  | "antepost_category"
  | "antepost";

export type jurisdictionType = "CDG" | "DGA" | "IGC" | "MGA" | "UKGC" | "SGA";

export interface eventType {
  bet_allowed?: boolean;
  bettable?: boolean;
  chart_time_period?: string | null; // The time period for which the chart data is available
  created: string;
  description: string | null;
  display_order?: number | null; // On Smarkets listings pages, events will be sorted according to these numbers, in descending order
  end_date: string | null;
  full_slug: string;
  hidden: boolean;
  id: number;
  inplay_enabled?: boolean;
  modified: string;
  name: string;
  parent_id: number | null;
  seo_description: string | null; // A description of the event, for SEO purposes
  short_name: string | null;
  slug: string;
  special_rules: string | null;
  start_date: string | null;
  start_datetime: string | null;
  state: eventState;
  type: {
    domain: eventTypeDomain;
    scope: eventTypeScope;
  };
}

export type competitorTypes =
  | "a"
  | "b"
  | "home"
  | "away"
  | "Runner"
  | "NonRunner";

export interface competitorType {
  event_id: number;
  id: number;
  info?: {
    colorPrimary?: string;
    colorSecondary?: string;
    keywords?: string[];
  };
  name: string;
  short_name: string;
  short_code: string;
  slug: string;
  type: competitorTypes;
}

export interface extendedEventType extends eventType {
  competitors: competitorType[];
  markets: extendedMarketType[];
  states: any;
}
