import { useQuery } from '@tanstack/react-query';
import { nftApi } from 'src/services/nft_api';

export const useSameCreateUnitNftList = (
  nftCreateUnitId: number,
  pageNumber: number,
) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['sameCreateUnitNftList', pageNumber],
    queryFn: () => {
      return nftApi.getNftsByNftCreateUnitId(nftCreateUnitId, pageNumber);
    },
  });

  return {
    nftList: data?.data,
    isPending,
    error,
  };
};
