import { useQuery } from '@tanstack/react-query';
import useAccount from '../common/useAccount';
import { combineApi } from 'src/services/combine_api';

export const useCombine = (page: string) => {
  const { address } = useAccount();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['combineList', address],
    queryFn: () => {
      return combineApi.getCombine(address, page);
    },
    enabled: !!address,
  });

  return {
    combineData: data?.data,
    refetch,
    isPending,
    error,
  };
};
