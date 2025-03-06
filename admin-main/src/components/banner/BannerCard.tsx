import { API } from "@/service/api";
import { Banner } from "@/type/banner";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Divider, Modal, Typography } from "@mui/material";
import { Reorder } from "framer-motion";
import React from "react";

function BannerCard({ banner }: { banner: Banner }) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await API.Admin.deleteBanner(banner.bannerId);
      setOpen(false);
      location.reload();
    } else {
      return;
    }
  };
  return (
    <>
      <Reorder.Item value={banner}>
        <Card
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <img
            src={banner.mobileImagePath}
            alt=""
            height={200}
            onClick={() => setOpen(true)}
          />
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
          {banner.link && (
            <>
              <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
              <Typography variant="h3">Link</Typography>
              <Typography variant="body1">{banner.link}</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
            </>
          )}
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h3">PC Banner</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: 5,
            }}
          >
            <img src={banner.imagePath} alt="" width={844} height={329} />
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="h3">Mobile Banner</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div
            style={{
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <img src={banner.mobileImagePath} alt="" width={390} height={510} />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default BannerCard;

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
