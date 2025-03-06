import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const usePopularTheme = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['popularTheme'],
    queryFn: () => {
      return homeApi.getPopularTheme();
    },
  });

  return {
    popularTheme: data?.data,
    refetch,
    isPending,
    error,
  };
};
