import { useUserStore } from "@/store/user";

function useSnsAccount(): { address: string | undefined } {
  const { user } = useUserStore();
  return {
    address: user?.userAddress,
  };
}

export default useSnsAccount;
