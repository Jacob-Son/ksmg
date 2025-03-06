import { Box, Typography } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { API } from "@/service/api";

interface Props {
  data: any;
  refetch: any;
  isSettledFilter: boolean;
  setSelectedIds: React.Dispatch<
    React.SetStateAction<Record<string, number[]>>
  >;
}

const columns = [
  { field: "settleId", headerName: "ID", width: 150 },
  { field: "userAddress", headerName: "유저 주소", width: 150 },
  { field: "settledAmount", headerName: "정산 금액", width: 150 },
  { field: "type", headerName: "유형", width: 150 },
  {
    field: "price",
    headerName: "nft 가격",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{params.row.nftSale.price}</div>;
    },
  },
  {
    field: "creatorFee",
    headerName: "창작자 수수료 비율",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{params.row.nftSale.creatorFee}</div>;
    },
  },
  {
    field: "platformFee",
    headerName: "플랫폼 수수료",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{params.row.nftSale.platformFee}</div>;
    },
  },
  {
    field: "nft 보러가기",
    headerName: "nft 보러가기",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <button
          onClick={() => {
            window.open(
              `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/store/${params.row.nftSale.nft.tokenId}`,
              "_blank"
            );
          }}
        >
          nft 보러가기
        </button>
      );
    },
  },
  {
    field: "updatedAt",
    headerName: "요청 날짜",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div>{moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM")}</div>
      );
    },
  },
  {
    field: "reject",
    headerName: "정산 거절",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return <RejectCell {...params} />;
    },
  },
];

function SettleList({ data, refetch, isSettledFilter, setSelectedIds }: Props) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{data.user.name} 님의 정산 내역</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          계좌번호: {data.user.accountNumber}
        </Typography>
        <Typography variant="h6">은행: {data.user.bankName}</Typography>
        <Typography variant="h6">예금주: {data.user.accountOwner}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      <DataGrid
        onRowSelectionModelChange={(params) => {
          const currentSelectedIds = params as number[];
          setSelectedIds((prev) => {
            return {
              ...prev,
              [data.user.userAddress]: currentSelectedIds,
            };
          });
        }}
        rows={data.settle.map((settle: any) => {
          return {
            ...settle,
            id: settle.settleId,
          };
        })}
        columns={columns}
        checkboxSelection={isSettledFilter ? false : true}
      />
    </div>
  );
}

export default SettleList;

const RejectCell = (params: GridRenderCellParams) => {
  const settleId = params.row.settleId;
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm("정산을 거절하시겠습니까?")) {
          await API.Admin.rejectSettle(settleId, "거래내역 불이치");
        }
        //   CommonModal.show({
        //     title: "정산 거절",
        //     subTitle: "정산을 거절하시겠습니까?",
        //     children: (
        //       <FormControl>
        //         <TextField
        //           placeholder="거절 사유를 입력해주세요"
        //           sx={{ width: "100%", marginTop: "20px" }}
        //         />
        //         <Box
        //           sx={{
        //             display: "flex",
        //             flexDirection: "row",
        //             marginTop: "40px",
        //             justifyContent: "flex-end",
        //           }}
        //         >
        //           <Button
        //             onClick={() => {
        //               // 정산 거절 로직
        //             }}
        //             variant="contained"
        //           >
        //             거절
        //           </Button>
        //         </Box>
        //       </FormControl>
        //     ),
        //   });
      }}
    >
      정산 거절
    </button>
  );
};
