import { useQuery } from '@tanstack/react-query';
import { faqApi } from 'src/services/faq_api';

function useFaq() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['faq_list'],
    queryFn: () => {
      return faqApi.getFaqs();
    },
  });
  return {
    faqList: data?.data,
    refetch,
    isPending,
    error,
  };
}

export default useFaq;
