import { useQuery } from '@tanstack/react-query';
import { nftApi } from 'src/services/nft_api';

export const useNftList = (
  pageNumber: number,
  category?: string,
  theme?: string,
  search?: string,
) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ['nftList', pageNumber, category, theme, search],
    queryFn: () => {
      return nftApi.getNfts(pageNumber, category, theme, search);
    },
  });

  return {
    nftList: data?.data,
    isLoading,
    isPending,
    error,
  };
};
