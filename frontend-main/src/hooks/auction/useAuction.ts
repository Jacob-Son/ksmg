import { useQuery } from '@tanstack/react-query';
import { auctionApi } from 'src/services/auction_api';

export const useAuction = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['auction', id],
    queryFn: () => {
      return auctionApi.getAuction(id);
    },
  });

  return {
    auction: data?.data,
    refetch,
    isPending,
    error,
  };
};
