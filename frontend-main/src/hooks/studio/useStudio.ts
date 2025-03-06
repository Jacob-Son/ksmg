import { useQuery } from '@tanstack/react-query';
import { studioApi } from 'src/services/studio_api';
import useAccount from '../common/useAccount';

function useStudio(page: number) {
  const { address } = useAccount();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['studio', address, page],
    queryFn: () => {
      return studioApi.getStudio(address, page);
    },
    enabled: !!address,
  });

  return {
    studio: data?.data,
    isPending,
    error,
    refetch,
  };
}

export default useStudio;
