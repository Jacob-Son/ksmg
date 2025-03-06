import { useQuery } from '@tanstack/react-query';
import { eventApi } from 'src/services/event_api';

export const useEventDetail = (eventId: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => {
      return eventApi.getEventById(eventId);
    },
  });

  return {
    event: data?.data,
    refetch,
    isPending,
    error,
  };
};
