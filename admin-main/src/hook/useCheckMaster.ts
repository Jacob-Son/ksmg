import React, { useEffect } from "react";
import { useUser } from "./useUser";
import { useRouter } from "next/navigation";

function useCheckMaster() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      if (!user.isMasterAdmin) {
        alert("마스터 관리자만 접근 가능합니다.");
        router.push("/");
      }
    }
  }, [user]);
}

export default useCheckMaster;
