import { useQuery } from '@tanstack/react-query';
import { nftApi } from 'src/services/nft_api';

export const useNft = (collectionAddress: string, tokenId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['nft', collectionAddress, tokenId],
    queryFn: () => {
      return nftApi.getNft(collectionAddress, tokenId);
    },
  });

  return {
    nft: data?.data,
    isPending,
    error,
  };
};
