"use client";

import useCheckMaster from "@/hook/useCheckMaster";
import { API } from "@/service/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function Fee() {
  useCheckMaster();
  const { data: fee, refetch } = useQuery({
    queryKey: ["fee"],
    queryFn: () => API.Admin.getPlatformFee().then((res) => res.data.data),
  });
  const [feeNum, setFeeNum] = React.useState<number>(0);
  const handleFee = async () => {
    await API.Admin.updatePlatformFee(feeNum);
    await refetch();
  };
  return (
    <div>
      <Typography variant="h4">
        현재 수수료는 <b>{fee}</b> 입니다. <br />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        helperText="입력해서 수정할 수 있습니다"
        id="fee"
        label="Fee"
        value={feeNum}
        onChange={(e) => setFeeNum(Number(e.target.value))}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />{" "}
      <Button variant="contained" onClick={handleFee}>
        수정
      </Button>
    </div>
  );
}

export default Fee;
