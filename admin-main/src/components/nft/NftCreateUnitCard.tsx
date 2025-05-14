import { API } from "@/service/api";
import { NftCreateUnit } from "@/type/nftCreateUnit";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Modal, Switch, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function NftCreateUnitCard({
  nftCreateUnit,
  refetch,
}: {
  nftCreateUnit: NftCreateUnit;
  refetch: any;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
        onClick={() => setOpen(true)}
      >
        <img src={nftCreateUnit.imagePath} width={100} alt="" />
        <div>
          <Typography variant="body2">{nftCreateUnit.name}</Typography>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={nftCreateUnit.imagePath} width={100} height={100} alt="" />
          <Typography variant="body2">이름: {nftCreateUnit.name}</Typography>
          <Typography variant="body2">
            카테고리: {nftCreateUnit.category}
          </Typography>
          <Typography variant="body2">
            주제: {nftCreateUnit.theme ? nftCreateUnit.theme : "없음"}
          </Typography>
          <Typography variant="body2">
            상품주소: {nftCreateUnit.creatorAddress}
          </Typography>
          <Typography variant="body2">
            상품 수수료: {nftCreateUnit.creatorFee}
          </Typography>
          <Typography variant="body2">
            가리기 ( 켜면 보여지고 끄면 보여지지 않습니다 )
          </Typography>
          <Switch
            checked={!nftCreateUnit.isHidden}
            onChange={async () => {
              await API.Admin.hideNftCreateUnit(
                nftCreateUnit.nftCreateUnitId,
                !nftCreateUnit.isHidden
              );
              refetch();
            }}
          />
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={async () => {
              if (!confirm("정말 삭제하시겠습니까?")) return;
              await API.Admin.deleteNftCreateUnit(
                nftCreateUnit.nftCreateUnitId
              );
              setOpen(false);
              refetch();
            }}
          >
            <Delete />
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default NftCreateUnitCard;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  overflow: "scroll" as "scroll",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
