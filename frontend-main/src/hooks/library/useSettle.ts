import { useQuery } from '@tanstack/react-query';
import useAccount from '../common/useAccount';
import { userApi } from 'src/services/user_api';

function useSettle() {
  const { address } = useAccount();
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['settlePrice', address],
    queryFn: () => userApi.getUserSettleInfo(address),
    enabled: !!address,
  });

  return {
    settlePrice: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
}

export default useSettle;
