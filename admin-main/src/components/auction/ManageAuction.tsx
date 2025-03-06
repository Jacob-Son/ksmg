import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AuctionCard from "./AuctionCard";
import { Grid, Stack } from "@mui/material";

function ManageAuction() {
  const { data: auctionList, refetch } = useQuery({
    queryKey: ["auctionsList"],
    queryFn: () => API.Auction.getAuctionList(),
  });

  return (
    <Grid container spacing={2}>
      {auctionList &&
        auctionList?.data.data.map((auction: any, idx: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <AuctionCard key={idx} auction={auction} refetch={refetch} />
          </Grid>
        ))}
    </Grid>
  );
}

export default ManageAuction;
