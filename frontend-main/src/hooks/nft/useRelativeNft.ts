import { useQuery } from '@tanstack/react-query';
import { nftApi } from 'src/services/nft_api';

export const useRelativeNft = (collectionAddress: string, tokenId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['relativeNft', collectionAddress, tokenId],
    queryFn: () => {
      return nftApi.getRelativeNft(collectionAddress, tokenId);
    },
  });

  return {
    relativeNft: data?.data,
    isPending,
    error,
  };
};
