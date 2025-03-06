import { useQuery } from '@tanstack/react-query';
import useAccount from '../common/useAccount';
import { combineApi } from 'src/services/combine_api';

export const useCombineDetail = (combineId: number) => {
  const { address } = useAccount();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['combineDetail', address],
    queryFn: () => {
      return combineApi.getCombineDetail(combineId);
    },
    enabled: !!address,
  });

  return {
    combine: data?.data,
    refetch,
    isPending,
    error,
  };
};
