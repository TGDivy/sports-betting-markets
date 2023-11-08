export type marketCategoryType =
  | "goals"
  | "half_time"
  | "handicap"
  | "totals"
  | "corners"
  | "cards"
  | "players"
  | "winner"
  | "other"
  | "teams"
  | "place"
  | "relegation"
  | "nationality"
  | "make_the_cut"
  | "first_round_leader"
  | "one_eighty"
  | "set"
  | "game"
  | "half"
  | "quarter"
  | "frame"
  | "hole_in_one"
  | "hole_group_betting"
  | "hole_match_bet"
  | "bet_builder";

export interface marketType {
  bet_delay: number;
  cashout_unavailable: boolean;
  categories?: string[];
  category?: marketCategoryType;
  complete: boolean;
  created: string;
  display_order?: number;
  description?: string;
  display_type?: string;
  event_id: number;
  hidden: boolean;
  id: number;
  info?: {
    description?: string;
  };
  inplay_enabled: boolean;
  market_type?: {
    description?: string;
    name: string;
    param: string;
    params: {
      [key: string]: string;
    };
  };
  modified: string;
  name: string;
  slug: string;
  state:
    | "new"
    | "open"
    | "live"
    | "halted"
    | "settled"
    | "voided"
    | "unavailable";
  winner_count: number;
}

export interface volumentType {
  double_stake_volume: number;
  market_id: number;
  volume: number;
}

export interface contractType {
  id: number;
  market_id: number;
  name: string;
  // Other properties are present, but skipped due to time
}

export interface extendedContractType extends contractType {
  bids: {
    price: number;
    quantity: number;
  }[];
  offers: {
    price: number;
    quantity: number;
  }[];
}

export interface marketQuotes {
  [contract_id: number]: {
    bids: {
      price: number;
      quantity: number;
    }[];
    offers: {
      price: number;
      quantity: number;
    }[];
  };
}

export interface extendedMarketType extends marketType {
  volume?: volumentType;
  contracts?: extendedContractType[];
}
