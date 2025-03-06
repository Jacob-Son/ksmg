"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateFaq from "@/components/faq/CreateFaq";
import ManageFaq from "@/components/faq/ManageFaq";

function Faq() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="Faq tab" value={tabIndex}>
          <Tab label="Create Faq" value={0} onClick={() => setTabIndex(0)} />
          <Tab label="Manage Faq" value={1} onClick={() => setTabIndex(1)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateFaq setTabIndex={setTabIndex} />,
          1: <ManageFaq />,
        }[tabIndex]
      }
    </div>
  );
}

export default Faq;
