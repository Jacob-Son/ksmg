"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateBanner from "@/components/banner/CreateBanner";
import ManageBanner from "@/components/banner/ManageBanner";

function Banner() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="Banner tab" value={tabIndex}>
          <Tab label="Create Banner" value={0} onClick={() => setTabIndex(0)} />
          <Tab label="Manage Banner" value={1} onClick={() => setTabIndex(1)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateBanner setTabIndex={setTabIndex} />,
          1: <ManageBanner />,
        }[tabIndex]
      }
    </div>
  );
}

export default Banner;
