"use client";

import ManageNft from "@/components/nft/ManageNft";
import ManageNftCreateUnit from "@/components/nft/ManageNftCreateUnit";
import useCheckMaster from "@/hook/useCheckMaster";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function NFT() {
  useCheckMaster();
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="NFT tab" value={tabIndex}>
          <Tab label="작품관리" value={0} onClick={() => setTabIndex(0)} />
          <Tab label="Nft 관리" value={1} onClick={() => setTabIndex(1)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      {
        {
          0: <ManageNftCreateUnit />,
          1: <ManageNft />,
        }[tabIndex]
      }
    </div>
  );
}

export default NFT;
