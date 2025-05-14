import { Nft, NftType } from "@/types/nft";
import { Typography } from "@mui/material";
import React from "react";

function NftInfo({ nft }: { nft: Nft }) {
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        NFT 정보
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "20px" }}>
        다음상품이 맞는지 확인해주세요
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <img src={nft.nftImagePath} alt="" width={200} />
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>이름:</strong> {nft.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>카테고리:</strong> {nft.category}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>Token ID:</strong> {nft.tokenId}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>Owner:</strong> {nft.ownerAddress}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>Creator:</strong> {nft.creatorAddress}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        <strong>상품 수수료:</strong> {nft.royalty}%
      </Typography>
    </div>
  );
}

export default NftInfo;
