import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useBanner = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['banner'],
    queryFn: () => {
      return homeApi.getBanner();
    },
  });

  return {
    banner: data?.data,
    refetch,
    isPending,
    error,
  };
};
