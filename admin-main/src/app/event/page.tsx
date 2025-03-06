"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateEvent from "@/components/event/CreateEvent";
import ManageEvent from "@/components/event/ManageAuction";

function Event() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="event tab" value={tabIndex}>
          <Tab label="Create Event" value={0} onClick={() => setTabIndex(0)} />
          <Tab label="Manage Event" value={1} onClick={() => setTabIndex(1)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateEvent setTabIndex={setTabIndex} />,
          1: <ManageEvent />,
        }[tabIndex]
      }
    </div>
  );
}

export default Event;
