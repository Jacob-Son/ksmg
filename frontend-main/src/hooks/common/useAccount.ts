import { useUserStore } from 'src/stores/user/user.store';

function useAccount(): { address: string | undefined } {
  const { user } = useUserStore();
  return {
    address: user === undefined ? null : user?.userAddress,
  };
}

export default useAccount;
