import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Grid } from "@mui/material";
import FaqCard from "./FaqCard";

function ManageFaq() {
  const { data: faqList, refetch } = useQuery({
    queryKey: ["faqList"],
    queryFn: () => API.Faq.getFaqList().then((res) => res.data.data),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {faqList &&
        faqList?.map((faq: any, idx: number) => (
          <FaqCard faq={faq} refetch={refetch} key={idx} />
        ))}
    </div>
  );
}

export default ManageFaq;
