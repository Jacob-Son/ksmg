import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useRecommend = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['recomment'],
    queryFn: () => {
      return homeApi.getRecommend();
    },
  });

  return {
    recommend: data?.data,
    refetch,
    isPending,
    error,
  };
};
