import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useBestNft = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['bestNft'],
    queryFn: () => {
      return homeApi.getBestNft();
    },
  });

  return {
    bestNft: data?.data,
    refetch,
    isPending,
    error,
  };
};
