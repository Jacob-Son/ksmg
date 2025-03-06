import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import NoticeCard from "./NoticeCard";

function ManageNotice() {
  const { data: noticeList, refetch } = useQuery({
    queryKey: ["noticeList"],
    queryFn: () => API.Notice.getNoticeList().then((res) => res.data.data),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {noticeList &&
        noticeList?.map((notice: any, idx: number) => (
          <NoticeCard notice={notice} refetch={refetch} key={idx} />
        ))}
    </div>
  );
}

export default ManageNotice;
