import { useQuery } from '@tanstack/react-query';
import { nftApi } from 'src/services/nft_api';

export const useLike = (
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['like', collectionAddress, tokenId, userAddress],
    queryFn: () => {
      return nftApi.getIsLike(collectionAddress, tokenId, userAddress);
    },
    enabled: !!userAddress,
  });

  return {
    isLike: data?.data,
    refetch,
    isPending,
    error,
  };
};
