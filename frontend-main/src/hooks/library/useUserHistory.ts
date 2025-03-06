import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';
import useAccount from '../common/useAccount';
import { SettleTabEnum } from 'src/components/library/settle/Settles';

export const useUserHistory = (page: number, type: SettleTabEnum) => {
  const { address } = useAccount();
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['history', address, page, type],
    queryFn: () => {
      if (type === SettleTabEnum.SELL) {
        return userApi.getUserSellHistories(address, page ? page : 1);
      } else if (type === SettleTabEnum.BUY) {
        return userApi.getUserBuyHistories(address, page ? page : 1);
      }
    },
    enabled: !!address,
  });

  return {
    history: data?.data,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
