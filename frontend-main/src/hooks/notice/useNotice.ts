import { useQuery } from '@tanstack/react-query';
import { noticeApi } from 'src/services/notice_api';

function useNotice() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['notice_list'],
    queryFn: () => {
      return noticeApi.getNotices();
    },
  });
  return {
    noticeList: data?.data,
    refetch,
    isPending,
    error,
  };
}

export default useNotice;
