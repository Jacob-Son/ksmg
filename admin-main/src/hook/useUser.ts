import { API } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import useSnsAccount from "./useSnsAccount";
import { IUser } from "@/store/user";

export const useUser = () => {
  const { address } = useSnsAccount();
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: ["user", address],
    queryFn: () => API.User.getUser(address!),
    enabled: !!address,
  });

  return {
    user: data?.data as IUser,
    refetch,
    isPending,
    isLoading,
    error,
  };
};
