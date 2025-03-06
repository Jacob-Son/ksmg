import { useQuery } from '@tanstack/react-query';
import useAccount from '../common/useAccount';
import { combineApi } from 'src/services/combine_api';

export const useCombineNfts = () => {
  const { address } = useAccount();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['combineNftList', address],
    queryFn: () => {
      return combineApi.getCombineNfts(address);
    },
    enabled: !!address,
  });

  return {
    nfts: data?.data,
    refetch,
    isPending,
    error,
  };
};
