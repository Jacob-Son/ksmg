import { API } from "@/service/api";
import useToastStore from "@/store/toast";
import { CombineDelivery } from "@/types/combine";
import { Box, Button, FormHelperText, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";

function DeliveryEditModal({
  modalData,
  closeModal,
  refetch,
}: {
  modalData: {
    id: string;
    phoneNumber: string;
    postCode: string;
    mainAddress: string;
    detailAddress: string;
  };
  closeModal: () => void;
  refetch: any;
}) {
  const addToast = useToastStore((s) => s.addToast);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [postCode, setPostCode] = React.useState<string>("");
  const [mainAddress, setMainAddress] = React.useState<string>("");
  const [detailAddress, setDetailAddress] = React.useState<string>("");

  useEffect(() => {
    if (modalData) {
      setPhoneNumber(modalData.phoneNumber);
      setPostCode(modalData.postCode);
      setMainAddress(modalData.mainAddress);
      setDetailAddress(modalData.detailAddress);
    }
  }, [modalData]);

  const handleSubmit = async () => {
    await API.Admin.updateDelivery(Number(modalData?.id), {
      phoneNumber,
      postCode,
      mainAddress,
      detailAddress,
    });
    await refetch();
    closeModal();
    addToast({
      message: "수정이 완료되었습니다.",
      type: "success",
    });
  };

  return (
    <Modal
      open={modalData !== null}
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
        <TextField
          fullWidth
          id="phoneNumber"
          label="phoneNumber"
          type="string"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
        <TextField
          fullWidth
          id="postCode"
          label="postCode"
          type="string"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
        <TextField
          fullWidth
          id="mainAddress"
          label="mainAddress"
          type="string"
          value={mainAddress}
          onChange={(e) => setMainAddress(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
        <TextField
          fullWidth
          id="detailAddress"
          label="detailAddress"
          type="string"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
        <Button variant="contained" onClick={handleSubmit}>
          Edit
        </Button>
      </Box>
    </Modal>
  );
}

export default DeliveryEditModal;
