import { useQuery } from '@tanstack/react-query';
import { auctionApi } from 'src/services/auction_api';

export const useBids = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['Bid', id],
    queryFn: () => {
      return auctionApi.getBids(id);
    },
  });

  return {
    bids: data?.data,
    refetch,
    isPending,
    error,
  };
};
