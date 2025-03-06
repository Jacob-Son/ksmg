"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateNotice from "@/components/notice/CreateNotice";
import ManageNotice from "@/components/notice/ManageNotice";

function Notice() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="Notice tab" value={tabIndex}>
          <Tab label="Create Notice" value={0} onClick={() => setTabIndex(0)} />
          <Tab label="Manage Notice" value={1} onClick={() => setTabIndex(1)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateNotice setTabIndex={setTabIndex} />,
          1: <ManageNotice />,
        }[tabIndex]
      }
    </div>
  );
}

export default Notice;
