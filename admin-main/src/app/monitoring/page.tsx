"use client";

import { connector } from "@/components/common/Provider";
import useCheckMaster from "@/hook/useCheckMaster";
import useLoadinStore from "@/store/loading";
import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useNetwork,
  useSendTransaction,
  useSwitchNetwork,
} from "wagmi";

function Monitoring() {
  useCheckMaster();
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { connectAsync } = useConnect();
  const [amount, setAmount] = React.useState<number>(0);
  const relayerAddress = process.env
    .NEXT_PUBLIC_RELAYER_ADDRESS as `0x${string}`;

  const { data: relayerBalance } = useBalance({
    address: relayerAddress,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  });

  const { data: userBalance } = useBalance({
    address: address,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    enabled: !!address,
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync, pendingChainId } = useSwitchNetwork();
  const { sendTransactionAsync, isLoading } = useSendTransaction();
  const { setLoading } = useLoadinStore();

  const handleCharge = async () => {
    try {
      await sendTransactionAsync({
        to: relayerAddress,
        value: BigInt(amount * 10 ** 18),
      });
      setAmount(0);
    } catch (e) {
      console.log(e);
    }
  };

  const checkUser = async () => {
    if (process.env.NEXT_PUBLIC_ADMIN_ADDRESS !== address) {
      alert("관리자만 충전할 수 있습니다.");
      await disconnectAsync();
      return;
    }
  };

  const checkNetwork = async () => {
    if (!switchNetworkAsync) return;
    if (chain?.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      await switchNetworkAsync(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
    }
  };

  useEffect(() => {
    if (!address) return;
    checkUser();
  }, [address]);

  useEffect(() => {
    checkNetwork();
  }, [chain?.id]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      {isConnected ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body1" fontSize={20}>
            <b>내 지갑주소</b>: {address}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body1" fontSize={20}>
            <b>잔액</b>:{" "}
            {userBalance &&
              Math.floor(Number(userBalance.formatted) * 100) / 100}{" "}
            MATIC
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Button
            variant="contained"
            sx={{
              height: "50px",
              backgroundColor: "#000000",
            }}
            onClick={async () => {
              await disconnectAsync();
            }}
          >
            로그아웃
          </Button>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body1" fontSize={20}>
            <b>Relayer 지갑주소</b>: {relayerAddress}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body1" fontSize={20}>
            <b>잔액</b>:{" "}
            {relayerBalance &&
              Math.floor(Number(relayerBalance.formatted) * 100) / 100}{" "}
            MATIC
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Typography variant="body1" fontSize={20}>
            충전
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <TextField
            id="amount"
            label="amount"
            type="string"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Button
            variant="contained"
            sx={{
              height: "50px",
              backgroundColor: "#000000",
            }}
            disabled={amount <= 0 || amount > Number(userBalance?.formatted)}
            onClick={handleCharge}
          >
            충전
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" fontSize={20}>
            지갑 연결이 필요합니다.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
          <Button
            variant="contained"
            sx={{
              height: "50px",
              backgroundColor: "#000000",
            }}
            onClick={async () => {
              const res = await connectAsync({
                connector: connector,
              });
            }}
          >
            지갑 연결
          </Button>
        </>
      )}
    </div>
  );
}

export default Monitoring;
