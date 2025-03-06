import { Box, Button, FormHelperText, TextField } from "@mui/material";
import React from "react";
import NftInfo from "./NftInfo";
import useLoadinStore from "@/store/loading";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service/api";

function BurnForm({ tokenId }: { tokenId: string }) {
  const { setLoading } = useLoadinStore();
  const { data: nft } = useQuery({
    queryKey: ["NFTInfo"],
    queryFn: () =>
      API.Nft.getNft("0xtest", tokenId).then((res) => res.data.data),
  });
  const handleBurn = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    setLoading(true);
    await API.Nft.burnNft("0xtest", tokenId);
    alert("삭제가 완료되었습니다.");
    window.location.reload();
    setLoading(false);
  };
  return (
    <div>
      {nft && <NftInfo nft={nft} />}
      <FormHelperText>
        영구적으로 DB, 블록체인 상 모두 지워지므로 주의해주세요
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      <Button variant="contained" onClick={handleBurn}>
        삭제
      </Button>
    </div>
  );
}

export default BurnForm;
