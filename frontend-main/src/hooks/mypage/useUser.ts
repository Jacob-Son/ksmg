import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';
import useAccount from '../common/useAccount';

export const useUser = () => {
  const { address } = useAccount();
  console.log('address', address);
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['user', address],
    queryFn: () => userApi.getUserInfo(address),
    enabled: !!address,
  });

  return {
    user: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
