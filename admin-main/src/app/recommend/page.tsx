"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateRecommend from "@/components/recommend/CreateRecommend";
import ManageRecommend from "@/components/recommend/ManageRecommend";

function Recommend() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="Recommend tab" value={tabIndex}>
          <Tab
            label="Create Recommend"
            value={0}
            onClick={() => setTabIndex(0)}
          />
          <Tab
            label="Manage Recommend"
            value={1}
            onClick={() => setTabIndex(1)}
          />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateRecommend setTabIndex={setTabIndex} />,
          1: <ManageRecommend />,
        }[tabIndex]
      }
    </div>
  );
}

export default Recommend;
