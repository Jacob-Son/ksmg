"use client";

import SettleList from "@/components/settle/SettleList";
import useCheckMaster from "@/hook/useCheckMaster";
import { API } from "@/service/api";
import { Box, Button, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";

function Settle() {
  useCheckMaster();
  const [isSettledFilter, setIsSettledFilter] = React.useState<boolean>(false);
  const [selectedIds, setSelectedIds] = React.useState<{
    [key: string]: number[];
  }>({});
  const { data: settleList, refetch } = useQuery({
    queryKey: ["settleRequestList", isSettledFilter],
    queryFn: () =>
      API.Admin.getSettleReqeustList(isSettledFilter).then(
        (res) => res.data.data
      ),
  });
  const { data: settleArray, refetch: refetchSettle } = useQuery({
    queryKey: ["settleList", selectedIds],
    queryFn: () =>
      API.Admin.getSettleList(Object.values(selectedIds).flat()).then(
        (res) => res.data.data
      ),
    enabled: Object.values(selectedIds).flat().length !== 0,
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Select
          native
          value={isSettledFilter}
          onChange={(e) => {
            setIsSettledFilter(e.target.value == "true");
            refetch();
          }}
        >
          <option value="false">미정산</option>
          <option value="true">정산됨</option>
        </Select>
        {!isSettledFilter && settleList && settleList.data && (
          <CSVLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "black",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
            asyncOnClick={true}
            data={
              settleArray?.data?.map((item: any) => {
                return {
                  이름: item.user.name,
                  폰번호: item.user.phoneNumber,
                  은행: item.user.bankName,
                  예금주: item.user.accountOwner,
                  계좌: item.user.accountNumber.toString(),
                  정산금액: item.settledAmount,
                  가격: item.nftSale.price,
                  창작자수수료: item.nftSale.creatorFee,
                  플랫폼수수료: item.nftSale.platformFee,
                  요청날짜: moment(item.createdAt).format("YYYY-MM-DD HH:MM"),
                };
              }) ?? []
            }
            headers={[
              { label: "이름", key: "이름" },
              { label: "폰번호", key: "폰번호" },
              { label: "은행", key: "은행" },
              { label: "예금주", key: "예금주" },
              { label: "계좌", key: "계좌" },
              { label: "정산금액", key: "정산금액" },
              { label: "가격", key: "가격" },
              { label: "창작자수수료", key: "창작자수수료" },
              { label: "플랫폼수수료", key: "플랫폼수수료" },
              { label: "요청날짜", key: "요청날짜" },
            ]}
            filename={"정산목록.csv"}
            onClick={async (e: any) => {
              try {
                await API.Admin.confirmSettle(
                  Object.values(selectedIds).flat()
                );
                await refetchSettle();
              } catch (e) {
                alert(
                  "정산 처리에 실패했습니다. 해당 엑셀은 처리하지 마십시오"
                );
              }
            }}
          >
            다운로드 및 정산 처리하기
          </CSVLink>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      {settleList && settleList.data ? (
        settleList.data.length > 0 ? (
          <div>
            {settleList.data.map((item: any) => (
              <SettleList
                data={item}
                key={item.userAddress}
                refetch={refetch}
                isSettledFilter={isSettledFilter}
                setSelectedIds={setSelectedIds}
              />
            ))}
          </div>
        ) : (
          <div>없음</div>
        )
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}

export default Settle;
