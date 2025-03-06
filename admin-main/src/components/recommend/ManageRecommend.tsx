import { Reorder } from "framer-motion";
import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Recommend } from "@/type/recommend";
import RecommendCard from "./RecommendCard";

function ManageRecommend() {
  const { data: recommendList } = useQuery({
    queryKey: ["recommendList"],
    queryFn: () => API.Admin.getRecommendList().then((res) => res.data.data),
  });
  const [recommend, setRecommend] = React.useState<
    {
      recommend: Recommend;
      nftImagePath: string;
      tokenId: string;
    }[]
  >([]);

  React.useEffect(() => {
    if (recommendList) {
      setRecommend(recommendList);
    }
  }, [recommendList]);

  return (
    <div>
      <Typography variant="h5">추천작품 관리</Typography>
      <Typography variant="body1">
        1. 추천작품을 드래그하여 순서를 변경할 수 있습니다.
      </Typography>
      <Typography variant="body1">
        2. 작품 이미지를 클릭하면 작품페이지로 이동하고 작가를 클릭하면 상세
        모달이 뜹니다. 그리고 삭제할 수 있습니다.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Reorder.Group
        axis="y"
        values={recommend}
        onReorder={(newOrder) => {
          setRecommend(newOrder);
          API.Admin.reorderRecommend(
            newOrder.map((item, idx) => {
              return {
                recommendId: item.recommend.recommendId,
                order: newOrder.length - idx,
              };
            })
          );
        }}
      >
        {recommend &&
          recommend?.map((item, idx: number) => (
            <RecommendCard
              key={item.recommend.recommendId}
              recommendInfo={item}
            />
          ))}
      </Reorder.Group>
    </div>
  );
}

export default ManageRecommend;
