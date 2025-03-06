import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Grid } from "@mui/material";
import EventCard from "./EventCard";

function ManageEvent() {
  const { data: eventList } = useQuery({
    queryKey: ["eventList"],
    queryFn: () => API.Event.getEventList().then((res) => res.data.data),
  });

  return (
    <Grid container spacing={2}>
      {eventList &&
        eventList?.events.map((event: any, idx: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <EventCard event={event} />
          </Grid>
        ))}
    </Grid>
  );
}

export default ManageEvent;
