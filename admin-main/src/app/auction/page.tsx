"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CreateAuction from "@/components/auction/CreateAuction";
import ManageAuction from "@/components/auction/ManageAuction";
import useCheckMaster from "@/hook/useCheckMaster";

function Auction() {
  useCheckMaster();
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="auction tab" value={tabIndex}>
          <Tab
            label="Create Auction"
            value={0}
            onClick={() => setTabIndex(0)}
          />
          <Tab
            label="Manage Auction"
            value={1}
            onClick={() => setTabIndex(1)}
          />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <CreateAuction setTabIndex={setTabIndex} />,
          1: <ManageAuction />,
        }[tabIndex]
      }
    </div>
  );
}

export default Auction;
