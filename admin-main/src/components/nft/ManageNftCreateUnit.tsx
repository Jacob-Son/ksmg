"use client";

import { API } from "@/service/api";
import { NftCreateUnit } from "@/type/nftCreateUnit";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import NftCreateUnitCard from "./NftCreateUnitCard";

function ManageNftCreateUnit() {
  const [page, setPage] = React.useState(1);
  const { data: nftCreateUnitList, refetch } = useQuery({
    queryKey: ["nftCreateUnitList", page],
    queryFn: () =>
      API.Admin.getNftCreateUnitList(page).then((res) => res.data.data),
  });

  return (
    <>
      <Typography variant="body1">
        작품 단위로 가리거나 제거할 때 사용합니다.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Grid container spacing={2}>
        {nftCreateUnitList?.data?.map((item: NftCreateUnit) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.nftCreateUnitId}>
              <NftCreateUnitCard nftCreateUnit={item} refetch={refetch} />
            </Grid>
          );
        })}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Pagination
          count={nftCreateUnitList?.totalPage}
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </div>
    </>
  );
}

export default ManageNftCreateUnit;
