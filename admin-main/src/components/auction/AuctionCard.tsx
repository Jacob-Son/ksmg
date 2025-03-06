import { API } from "@/service/api";
import useToastStore from "@/store/toast";
import { Close, Delete, Send } from "@mui/icons-material";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";

function AuctionCard({
  auction,
  refetch,
}: {
  auction: {
    auctionId: number;
    name: string;
    description: string;
    startPrice: number;
    estimatedPrice: number;
    startTime: Date;
    endTime: Date;
    images: string[];
    detailImage: string;
  };
  refetch: any;
}) {
  const addToast = useToastStore((s) => s.addToast);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          textAlign: "center",
        }}
        onClick={() => setOpen(true)}
      >
        <img src={auction.images[0]} alt="" />
        <div>
          <b>이름</b>: {auction.name}
        </div>
        <div>
          <b>설명</b>:{auction.description}
        </div>
        <div>
          <b>시작가격</b>: {auction.startPrice}
        </div>
        <div>
          <b>추정가</b>: {auction.estimatedPrice}
        </div>
        <div>
          <b>시작시각</b>: {moment(auction.startTime).format("YYYY-MM-DD")}
        </div>
        <div>
          <b>종료시각</b>: {moment(auction.endTime).format("YYYY-MM-DD")}
        </div>
      </Card>
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
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          >
            <Close />
          </div>
          <img src={auction.images[0]} alt="" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>이름</b>: {auction.name}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>설명</b>:{auction.description}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>시작가격</b>: {auction.startPrice}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>추정가</b>: {auction.estimatedPrice}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>시작시각</b>: {moment(auction.startTime).format("YYYY-MM-DD")}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>종료시각</b>: {moment(auction.endTime).format("YYYY-MM-DD")}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <div>
            <b>상세이미지</b>:
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 10 }} />
          <img src={auction.detailImage} alt="" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 10 }} />
          <div>
            <b>
              알림톡 보내기(상위 20명에게 알림이 갑니다. 경매가 종료된 후에
              사용하세요)
            </b>
            :
          </div>
          <Button
            variant="contained"
            size="small"
            onClick={async () => {
              if (
                !confirm(
                  "정말로 상위 알림톡을 보내시겠습니까? 경매가 끝났는지 한번 더 확인하세요!"
                )
              )
                return;
              await API.Admin.sendAuctionResult(auction.auctionId);
              await refetch();
              addToast({
                message: "알림톡을 보냈습니다.",
                type: "success",
              });
            }}
          >
            <Send />
          </Button>
          <Box sx={{ display: "flex", flexDirection: "row", height: 10 }} />

          <div>
            <b>삭제</b>:
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", height: 10 }} />
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
              onClick={async () => {
                if (!confirm("정말로 삭제하시겠습니까?")) return;
                await API.Auction.deleteAuction(auction.auctionId);
                await refetch();
              }}
            >
              <Delete />
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default AuctionCard;

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
