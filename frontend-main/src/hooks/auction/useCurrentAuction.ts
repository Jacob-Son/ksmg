import { useQuery } from '@tanstack/react-query';
import { auctionApi } from 'src/services/auction_api';

export const useCurrentAuction = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['ongoing-auction'],
    queryFn: () => {
      return auctionApi.getOngoingAuction();
    },
  });

  return {
    auction: data?.data,
    refetch,
    isPending,
    error,
  };
};
