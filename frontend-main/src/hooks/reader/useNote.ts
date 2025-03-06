import { useQuery } from '@tanstack/react-query';
import { bookApi } from 'src/services/book_api';

function useNote(bookId: number, userAddress: string, pageNumber: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ['note', bookId, pageNumber],
    queryFn: () => {
      return bookApi.getNotes(bookId, userAddress, pageNumber);
    },
    enabled: !!bookId && !!pageNumber,
  });

  return {
    notes: data?.data.notes,
    isPending,
    error,
  };
}

export default useNote;
