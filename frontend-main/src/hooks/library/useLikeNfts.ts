import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';

export const useLikeNfts = (address: string, page: number) => {
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['likeNfts', address, page],
    queryFn: () => {
      return userApi.getLikedNfts(address, page ? page : 1);
    },
    enabled: !!address,
  });

  return {
    likeNfts: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
