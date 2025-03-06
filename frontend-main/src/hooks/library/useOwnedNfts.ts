import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';
import useAccount from '../common/useAccount';

export const useOwnedNfts = (page?: number) => {
  const { address } = useAccount();
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['ownedNfts', address, page],
    queryFn: () => {
      return userApi.getOwnedNfts(address, page);
    },
    enabled: !!address,
  });

  return {
    ownedNfts: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
