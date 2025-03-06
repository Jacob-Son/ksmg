import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useHotNft = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['hotNft'],
    queryFn: () => {
      return homeApi.getHotNft();
    },
  });

  return {
    hotNft: data?.data,
    refetch,
    isPending,
    error,
  };
};
