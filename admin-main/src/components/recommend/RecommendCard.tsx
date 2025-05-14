import { API } from "@/service/api";
import { Banner } from "@/type/banner";
import { Recommend } from "@/type/recommend";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Divider, Modal, Typography } from "@mui/material";
import { Reorder } from "framer-motion";
import React from "react";

function RecommendCard({
  recommendInfo,
}: {
  recommendInfo: {
    recommend: Recommend;
    nftImagePath: string;
    tokenId: string;
  };
}) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await API.Admin.deleteRecommend(recommendInfo.recommend.recommendId);
      setOpen(false);
      location.reload();
    } else {
      return;
    }
  };
  return (
    <>
      <Reorder.Item value={recommendInfo}>
        <Card
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: recommendInfo.recommend.backgroundColor,
          }}
        >
          <img
            src={recommendInfo.nftImagePath}
            alt=""
            height={200}
            onClick={() => {
              window.open(`https://pickapen.io/store/${recommendInfo.tokenId}`);
            }}
          />
          <img
            src={recommendInfo.recommend.profileImagePath}
            alt=""
            height={40}
            onClick={() => setOpen(true)}
          />
          <Typography variant="body1" onClick={() => setOpen(true)}>
            {recommendInfo.recommend.author}
          </Typography>
        </Card>
      </Reorder.Item>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={handleDelete}
            >
              <Delete />
            </Button>
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h4">nft image</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <img
            src={recommendInfo.nftImagePath}
            alt=""
            height={200}
            onClick={() => {
              window.open(`https://pickapen.io/store/${recommendInfo.tokenId}`);
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h4"></Typography>
          <img
            src={recommendInfo.recommend.profileImagePath}
            alt=""
            height={40}
            onClick={() => setOpen(true)}
          />
          <Typography variant="body1" onClick={() => setOpen(true)}>
            {recommendInfo.recommend.author}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h4">Intro</Typography>
          <Typography variant="body1">
            {recommendInfo.recommend.intro}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h4">Description</Typography>
          <Typography variant="body1">
            {recommendInfo.recommend.description}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h4">Token Id</Typography>
          <Typography variant="body1">{recommendInfo.tokenId}</Typography>
        </Box>
      </Modal>
    </>
  );
}

export default RecommendCard;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  overflow: "scroll" as "scroll",
  p: 4,
};
