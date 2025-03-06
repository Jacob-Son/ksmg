import { API } from "@/service/api";
import { Event } from "@/type/event";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";

function EventCard({ event }: { event: Event }) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await API.Event.deleteEvent(event.eventId);
      setOpen(false);
      location.reload();
    } else {
      return;
    }
  };
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
        <Image src={event.imagePath} width={100} height={100} alt="" />
        <div>
          <Typography variant="h6">{event.title}</Typography>
          <Typography variant="body2">
            {moment(event.startDay).format("YYYY-MM-DD") +
              "~" +
              moment(event.endDay).format("YYYY-MM-DD")}
          </Typography>
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
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Image src={event.imagePath} width={100} height={100} alt="" />
              <div>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2">
                  {moment(event.startDay).format("YYYY-MM-DD") +
                    "~" +
                    moment(event.endDay).format("YYYY-MM-DD")}
                </Typography>
              </div>
            </div>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={handleDelete}
            >
              <Delete />
            </Button>
          </div>
          {event.externalUrl && (
            <>
              <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
              <Typography variant="body2">
                외부링크: {event.externalUrl}
              </Typography>
            </>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body2">{event.description}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <img src={event.detailImagePath} width={500} />
        </Box>
      </Modal>
    </>
  );
}

export default EventCard;

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
