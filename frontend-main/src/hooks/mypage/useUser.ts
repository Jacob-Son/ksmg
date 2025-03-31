import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/services/user_api';
import useAccount from '../common/useAccount';

export const useUser = () => {
  const { address } = useAccount();
  console.log('📌 현재 지갑 주소:', address); // ✅ address가 정상적인지 확인

  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ['user', address],
    queryFn: () => userApi.getUserInfo(address),
    // enabled: !!address, // address가 존재할 때만 실행
  });

  console.log('🔍 API 응답 데이터:', data); // ✅ 응답 값 확인
  console.log('⚠️ API 에러:', error); // ✅ 에러 발생 여부 확인

  return {
    user: data?.data ?? null, // ✅ 기본값 null 설정
    refetch,
    isPending,
    isLoading,
    error,
  };
};