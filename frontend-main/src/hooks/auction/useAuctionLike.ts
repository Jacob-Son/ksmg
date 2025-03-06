import { useQuery } from '@tanstack/react-query';
import { auctionApi } from 'src/services/auction_api';

export const useAuctionLike = (id: number, address: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['auctionLike', id, address],
    queryFn: () => {
      return auctionApi.getAuctionLike(id, address);
    },
  });

  return {
    isLike: data?.data,
    refetch,
    isPending,
    error,
  };
};
