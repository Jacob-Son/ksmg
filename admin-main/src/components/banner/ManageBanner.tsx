import { Reorder } from "framer-motion";
import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BannerCard from "./BannerCard";
import { Banner } from "@/type/banner";

function ManageBanner() {
  const { data: bannerList } = useQuery({
    queryKey: ["bannerList"],
    queryFn: () => API.Admin.getBannerList().then((res) => res.data.data),
  });
  const [banner, setBanner] = React.useState<Banner[]>([]);

  React.useEffect(() => {
    if (bannerList) {
      setBanner(bannerList);
    }
  }, [bannerList]);

  return (
    <div>
      <Typography variant="h5">배너 관리</Typography>
      <Typography variant="body1">
        1. 배너를 드래그하여 순서를 변경할 수 있습니다.
      </Typography>
      <Typography variant="body1">
        2. 이미지를 클릭하면 이미지가 확대되어 보입니다. 그리고 삭제할 수
        있습니다
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Reorder.Group
        axis="y"
        values={banner}
        onReorder={(newOrder) => {
          setBanner(newOrder);
          API.Admin.reorderBanner(
            newOrder.map((item, idx) => {
              return { bannerId: item.bannerId, order: newOrder.length - idx };
            })
          );
        }}
      >
        {banner &&
          banner?.map((item: Banner, idx: number) => (
            <BannerCard key={item.bannerId} banner={item} />
          ))}
      </Reorder.Group>
    </div>
  );
}

export default ManageBanner;
