import React from "react";
import { useLocation, useParams } from "react-router-dom";

type Props = {};

// const getPopularCategories = async (type_domain: eventTypeDomain) => {
//     const { events } = await getEvents({
//       type_domain: [type_domain],
//       type_scope: ["category"],
//       include_hidden: false,
//       state: ["new", "upcoming", "live"],
//       limit: 15,
//       sort: "display_order,start_datetime,name",
//     });

//     return events;
//   };

export const EventsPage = (props: Props) => {
  const event_domain = useParams().event_domain;
  const location = useLocation();
  return <div>Events {event_domain}</div>;
};
