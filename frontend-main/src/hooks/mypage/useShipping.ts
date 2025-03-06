import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';
import useAccount from '../common/useAccount';

export const useShipping = () => {
  const { address } = useAccount();
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['shipping_info', address],
    queryFn: () => userApi.getUserShppingInfo(address),
    enabled: !!address,
  });

  return {
    shipping: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
