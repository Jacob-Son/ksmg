import { useQuery } from '@tanstack/react-query';
import { bookApi } from 'src/services/book_api';

function useBook(
  collectionAddress: string,
  tokenId: string,
  userAddress: string,
) {
  const { data, isPending, error } = useQuery({
    queryKey: ['book', collectionAddress, tokenId, userAddress],
    queryFn: () => {
      return bookApi.getBook(collectionAddress, tokenId, userAddress);
    },
    enabled: !!collectionAddress && !!tokenId,
  });

  return {
    book: data?.data,
    isPending,
    error,
  };
}

export default useBook;
