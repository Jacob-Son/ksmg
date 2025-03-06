import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TransferForm from "./TransferForm";
import BurnForm from "./BurnForm";
import { API } from "@/service/api";
import NftInfo from "./NftInfo";

enum NftType {
  TRANSFER = "transfer",
  BURN = "burn",
}

function ManageNft() {
  const [tokenId, setTokenId] = React.useState<string>("0");
  const [type, setType] = React.useState<NftType>(NftType.TRANSFER);
  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  const handleConfirm = async () => {
    const res = await API.Nft.getNft("0xtest", tokenId).then(
      (res) => res.data.data
    );
    if (!res) {
      alert("해당하는 NFT가 없습니다.");
      return;
    }
    setConfirmed(true);
  };

  const NftForm = () => {
    if (type === NftType.TRANSFER) {
      return <TransferForm tokenId={tokenId} />;
    } else if (type === NftType.BURN) {
      return <BurnForm tokenId={tokenId} />;
    }
  };
  return (
    <>
      {confirmed ? (
        <>
          <div
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              marginBottom: "20px",
            }}
            onClick={() => setConfirmed(false)}
          >
            {"<"} 뒤로 가기
          </div>
          <NftForm />
        </>
      ) : (
        <div>
          <Typography variant="body1">
            nft 하나 단위로 전송하거나 삭제할 수 있습니다.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <InputLabel id="type">TokenId</InputLabel>
          <TextField
            label="tokenId"
            type="number"
            onChange={(e) => {
              setTokenId(e.target.value);
            }}
          />
          <FormHelperText>
            전송하거나 제거할 NFT의 tokenId를 입력해주세요
          </FormHelperText>
          <FormHelperText>
            홈페이지에서 작품상세페이지의 주소 뒤에 있는 숫자입니다. ex)
            https://pickapen.io/store/10 에서 10 부분이 tokenId가 됩니다.
          </FormHelperText>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <InputLabel id="type">종류</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value as NftType);
            }}
          >
            <MenuItem value={NftType.TRANSFER}>전송</MenuItem>
            <MenuItem value={NftType.BURN}>삭제</MenuItem>
          </Select>
          <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
          <Button
            sx={{
              width: "200px",
            }}
            variant="contained"
            onClick={handleConfirm}
            disabled={!tokenId}
          >
            다음
          </Button>
        </div>
      )}
    </>
  );
}

export default ManageNft;
