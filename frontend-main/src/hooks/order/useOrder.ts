import { useQuery } from '@tanstack/react-query';
import { orderApi } from 'src/services/order_api';

function useOrder(orderId: number) {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => {
      return orderApi.getOrder(orderId);
    },
    enabled: !!orderId,
  });

  return {
    order: data?.data,
    refetch,
    isPending,
    error,
  };
}

export default useOrder;
