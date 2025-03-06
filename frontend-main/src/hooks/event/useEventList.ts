import { useQuery } from '@tanstack/react-query';
import { eventApi } from 'src/services/event_api';

export const useEventList = (page: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['eventList'],
    queryFn: () => {
      return eventApi.getEvents(page);
    },
  });

  return {
    eventList: data?.data,
    refetch,
    isPending,
    error,
  };
};
