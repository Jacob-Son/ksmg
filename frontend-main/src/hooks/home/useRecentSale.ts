import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { homeApi } from 'src/services/home_api';
import { SimpleNftType } from '~/types/nft';

export const useRecentSale = () => {
  const [recentSale, setRecentSale] = useState<SimpleNftType[]>();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['recentSale'],
    queryFn: () => {
      return homeApi.getRecentSale();
    },
  });

  useEffect(() => {
    if (data?.data) setRecentSale(data?.data);
  }, [data]);

  return {
    recentSale,
    refetch,
    isPending,
    error,
  };
};
