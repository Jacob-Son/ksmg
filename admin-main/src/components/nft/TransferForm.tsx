import { API } from "@/service/api";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import React from "react";
import NftInfo from "./NftInfo";
import { useQuery } from "@tanstack/react-query";
import useLoadinStore from "@/store/loading";

function TransferForm({ tokenId }: { tokenId: string }) {
  const { setLoading } = useLoadinStore();
  const [to, setTo] = React.useState<string>("");
  const { data: nft, refetch } = useQuery({
    queryKey: ["NFTInfo"],
    queryFn: () =>
      API.Nft.getNft("0xtest", tokenId).then((res) => res.data.data),
  });
  const handleTransfer = async () => {
    setLoading(true);
    const res = await API.Nft.transferNft("0xtest", tokenId, to);
    if (res.data.success === false) {
      alert(res.data.error);
      setLoading(false);
      return;
    }
    alert("전송이 완료되었습니다.");
    refetch();
    setLoading(false);
  };
  return (
    <div>
      {nft && <NftInfo nft={nft} />}
      <TextField
        label="전송할 사람 주소"
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <FormHelperText>
        전송하고자 하는 사람의 주소를 입력해주세요
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      <Button variant="contained" onClick={handleTransfer}>
        전송
      </Button>
    </div>
  );
}

export default TransferForm;
