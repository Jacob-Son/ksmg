import { useQuery } from '@tanstack/react-query';
import { homeApi } from 'src/services/home_api';

export const useCurrentEvent = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['currentEvent'],
    queryFn: () => {
      return homeApi.getCurrentEvent();
    },
  });

  return {
    currentEvent: data?.data,
    refetch,
    isPending,
    error,
  };
};
