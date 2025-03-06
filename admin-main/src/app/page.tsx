"use client";

import { useUser } from "@/hook/useUser";
import { Box, Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <Typography variant="h4">관리자 페이지</Typography>
      <Typography variant="body2">{user?.name} 님 반갑습니다!</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        로그아웃
      </Button>
    </div>
  );
}
