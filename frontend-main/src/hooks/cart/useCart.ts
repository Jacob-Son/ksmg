import { useQuery } from '@tanstack/react-query';
import { cartApi } from 'src/services/cart_api';

export const useCart = (useAddress: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['cart', useAddress],
    queryFn: () => {
      return cartApi.getCart(useAddress);
    },
    enabled: !!useAddress,
  });

  return {
    cart: data?.data,
    refetch,
    isPending,
    error,
  };
};
