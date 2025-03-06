import { API } from "@/service/api";
import { Delete } from "@mui/icons-material";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

type Faq = {
  faqId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

function FaqCard({ faq, refetch }: { faq: Faq; refetch: any }) {
  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await API.Faq.deleteFaq(faq.faqId);
      refetch();
    } else {
      return;
    }
  };

  return (
    <>
      <Card
        style={{
          gap: "20px",
          padding: "20px",
        }}
      >
        <Typography variant="h6">{faq.title}</Typography>
        <Box sx={{ height: "20px" }} />
        <div>
          {faq.content.split("\n").map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            );
          })}
        </div>
        <Box sx={{ height: "20px" }} />
        <Typography variant="body2">
          {moment(faq.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleDelete}
          >
            <Delete />
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default FaqCard;
