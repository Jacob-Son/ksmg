import { User } from "@/type/user";
import { Shipping } from "@/types/shipping";
import { Box, Divider, Modal, Typography } from "@mui/material";
import React from "react";

function UserModal({
  userInfo,
  closeModal,
}: {
  userInfo?: User & { shippingInfo?: Shipping };
  closeModal: () => void;
}) {
  return (
    <Modal
      open={!!userInfo}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: 1000,
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="body2">이름: {userInfo?.name}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        <Typography variant="body2">번호: {userInfo?.phoneNumber}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        <Typography variant="body2">이메일: {userInfo?.email}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        <Typography variant="body2">
          유저주소: {userInfo?.userAddress}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        <Divider />
        {userInfo?.shippingInfo ? (
          <>
            <Typography variant="h6" component="h1">
              배송정보
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
            <Typography variant="body2" component="h2">
              이름: {userInfo?.shippingInfo.name}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
            <Typography variant="body2" component="h2">
              번호: {userInfo?.shippingInfo.phoneNumber}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
            <Typography variant="body2" component="h2">
              주소: [우편번호: {userInfo?.shippingInfo.postCode}]{" "}
              {userInfo?.shippingInfo.mainAddress}{" "}
              {userInfo?.shippingInfo.detailAddress}
            </Typography>
          </>
        ) : (
          <div>
            <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
            <Typography variant="body2" component="h1">
              배송정보가 없습니다
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default UserModal;
