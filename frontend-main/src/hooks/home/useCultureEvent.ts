import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useCultureEvent = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['cultureEvent'],
    queryFn: () => {
      return homeApi.getCultureEvent();
    },
  });

  return {
    cultureEvent: data?.data,
    refetch,
    isPending,
    error,
  };
};
