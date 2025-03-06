import { Button, ButtonGroup } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";

function LoginPage() {
  return (
    <ButtonGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={async () => {
          await signIn("google");
        }}
      >
        구글
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await signIn("naver");
        }}
      >
        네이버
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await signIn("kakao");
        }}
      >
        카카오
      </Button>
    </ButtonGroup>
  );
}

export default LoginPage;
