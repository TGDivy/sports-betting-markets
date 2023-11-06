import {
  eventState,
  eventType,
  eventTypeDomain,
  eventTypeScope,
  jurisdictionType,
} from "../../types/smarket-events";
import { smarketsEventsAPI } from "./init";

interface getEventsRequest {
  id?: string[]; // A list of event IDs to filter by
  inplay_enabled?: boolean;
  state?: eventState;
  type_domain?: eventTypeDomain;
  type_scope?: eventTypeScope;
  with_new_type?: boolean;
  parent_id?: string[]; // A list of parent event IDs to filter by
  start_datetime_min?: string;
  start_datetime_max?: string;
  created_min?: string;
  created_max?: string;
  last_modified_min?: string;
  last_modified_max?: string;
  pagination_last_display_order?: number;
  pagination_last_start_datetime?: string;
  pagination_last_id?: number;
  pagination_last_name?: string;
  // The sorting order for the resulting events.
  // It should be used in conjunction with pagination parameters.
  // The default and recommended sorting order and pagination is by event id.
  // The links to the next page returned on every request help clients navigate through all the relevant events
  sort?: string;
  limit?: number;
  include_hidden?: boolean; // Whether to include hidden events in the results
  jurisdiction?: jurisdictionType; // The jurisdiction of the event
}

export const getEvents = async (params: getEventsRequest) => {
  params.with_new_type = true;
  try {
    const response = await smarketsEventsAPI.get<{
      events: eventType[];
      pagination: {
        next_page: string | null;
      };
    }>("", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};