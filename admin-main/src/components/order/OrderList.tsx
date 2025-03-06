"use client";

import { API } from "@/service/api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useLoadinStore from "@/store/loading";
import moment from "moment";
import { NftSaleForAdmin } from "@/types/order";
import { downloadZip } from "@/util/zip";
import UserModal from "./UserModal";
import { CSVLink } from "react-csv";
import { User } from "@/type/user";
import { Shipping } from "@/types/shipping";

function OrderList() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [searchType, setSearchType] = React.useState<
    | "nftSaleId"
    | "buyerAddress"
    | "sellerAddress"
    | "tokenId"
    | "buyerName"
    | "sellerName"
  >("nftSaleId");
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [isDeliverRequiredFilter, setIsDeliverRequiredFilter] =
    React.useState(false);
  const [period, setPeriod] = React.useState<[string, string]>(["", ""]);
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["orderList", page, limit, isDeliverRequiredFilter],
    queryFn: () =>
      API.Admin.getOrders({
        page,
        limit,
        startDate: period[0],
        endDate: period[1],
        searchType,
        searchKeyword,
        isDelivery: isDeliverRequiredFilter,
      }).then((res) => {
        return res.data.data;
      }),
  });
  const orderList = data?.data;
  const totalPage = data?.totalPage;
  const [rows, setRows] = React.useState<
    {
      id: number;
      nftSaleId: number;
      sellerName: string;
      buyerName: string;
      price: number;
      status: string;
      soldAt: string;
      confirmAt: string;
      nftName: string;
      category: string;
      tokenId: string;
      seller: User;
      buyer: User & { shippingInfo: Shipping };
    }[]
  >([]);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const setLoading = useLoadinStore((s) => s.setLoading);
  const [userInfo, setUserInfo] = React.useState<User | undefined>();

  const columns = [
    { field: "nftSaleId", headerName: "구매번호", width: 120 },
    {
      field: "sellerName",
      headerName: "판매자",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div
            onClick={() => {
              setUserInfo(params.row.seller);
            }}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {params.row.sellerName}
          </div>
        );
      },
    },
    {
      field: "buyerName",
      headerName: "구매자",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div
            onClick={() => {
              if (!params.row.buyer) return;
              setUserInfo(params.row.buyer);
            }}
            style={{
              cursor: "pointer",
              textDecoration: params.row.buyer ? "underline" : "none",
              color: !params.row.buyer ? "blue" : "black",
            }}
          >
            {params.row.buyerName}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "가격",
      width: 100,
    },
    {
      field: "status",
      headerName: "주문 상태",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const statusName = covertStatus(params.row.status);
        return <div>{statusName}</div>;
      },
    },
    {
      field: "soldAt",
      headerName: "구매시기",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.row.soldAt) return null;
        return (
          <div>{moment(params.row.soldAt).format("YYYY-MM-DD HH:MM")}</div>
        );
      },
    },
    // {
    //   field: "confirmAt",
    //   headerName: "확정시기",
    //   width: 200,
    //   renderCell: (params: GridRenderCellParams) => {
    //     if (!params.row.confirmAt) return <div>확정 전</div>;
    //     return (
    //       <div>{moment(params.row.confirmAt).format("YYYY-MM-DD HH:MM")}</div>
    //     );
    //   },
    // },
    {
      field: "nftName",
      headerName: "NFT 이름",
      width: 150,
    },
    {
      field: "category",
      headerName: "카테고리",
      width: 150,
    },
    {
      field: "tokenId",
      headerName: "토큰 id",
      width: 220,
    },
    {
      field: "book-down",
      headerName: "복각본 다운로드",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (
          !params.row?.delivery ||
          !params.row.delivery?.bookImages ||
          params.row.delivery?.bookImages.length === 0
        )
          return null;
        return (
          <button
            onClick={async () => {
              setLoading(true);
              try {
                await downloadZip(
                  params.row.delivery?.bookImages,
                  params.row.id
                );
              } catch (e) {
                console.error(e);
              } finally {
                setLoading(false);
              }
            }}
          >
            다운로드
          </button>
        );
      },
    },
    {
      field: "deliver-check",
      headerName: "배송여부",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.row?.delivery?.status) return null;
        return (
          <Select
            value={params.row.delivery.status}
            onChange={async (e) => {
              await API.Admin.updateOrderDeliveryStatus(
                params.row.id,
                e.target.value
              );
              await refetch();
            }}
            size="small"
            sx={{ height: 1 }}
            native
          >
            <option value="READY">확인전</option>
            <option value="CONFIRM">확인</option>
            <option value="DELIVERED">배송처리</option>
          </Select>
        );
      },
    },
    {
      field: "chain-info",
      headerName: "블록체인 정보",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.row.txHash) return null;
        const explorerPrefix =
          process.env.NEXT_PUBLIC_CHAIN_ID === "80001"
            ? "https://mumbai.polygonscan.com"
            : "https://polygonscan.com";
        return (
          <button
            onClick={() => {
              window.open(
                `${explorerPrefix}/tx/${params.row.txHash}`,
                "_blank"
              );
            }}
          >
            보기
          </button>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (orderList) {
      const _rows = orderList?.map((info: NftSaleForAdmin, idx: number) => {
        return {
          id: info.nftSaleId,
          ...info,
        };
      });
      setRows(_rows);
    }
  }, [orderList]);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "calc(100vw - 350px)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              size="small"
              sx={{ height: 1 }}
              native
            >
              <option value="nftSaleId">구매번호</option>
              <option value="buyerAddress">구매자 주소</option>
              <option value="sellerAddress">판매자 주소</option>
              <option value="buyerName">구매자 이름</option>
              <option value="sellerName">판매자 이름</option>
              <option value="tokenId">토큰 id</option>
              <option value="category">카테고리</option>
              <option value="nftName">NFT 이름</option>
            </Select>
            <Input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                setPage(1);
                refetch();
              }}
            >
              검색
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" fontSize={16}>
              구매 시기:
            </Typography>
            <Input
              type="date"
              value={period[0]}
              onChange={(e) => setPeriod([e.target.value, period[1]])}
            />
            <Typography variant="body1" fontSize={20}>
              ~
            </Typography>
            <Input
              type="date"
              value={period[1]}
              onChange={(e) => setPeriod([period[0], e.target.value])}
            />
            <Button
              variant="contained"
              onClick={() => {
                setPage(1);
                refetch();
              }}
            >
              적용
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: 20 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
            width: "calc(100vw - 350px)",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isDeliverRequiredFilter}
                onChange={() => {
                  setCheckedIds([]);
                  setIsDeliverRequiredFilter(!isDeliverRequiredFilter);
                }}
                name={"isDeliverRequiredFilter"}
              />
            }
            label={"배송 필요만 보기"}
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <CSVLink
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "black",
                padding: "10px",
                borderRadius: "10px",
              }}
              data={rows
                .filter(
                  (row) => row.nftSaleId && checkedIds.includes(row.nftSaleId)
                )
                .map((row) => ({
                  구매번호: row.nftSaleId,
                  판매자: row.sellerName,
                  구매자: row.buyerName,
                  가격: row.price,
                  상태: covertStatus(row.status),
                  구매시기: moment(row.soldAt).format("YYYY-MM-DD HH:MM"),
                  NFT이름: row.nftName,
                  카테고리: row.category,
                  토큰id: `'${row.tokenId}'`,
                }))}
              headers={[
                { label: "구매번호", key: "구매번호" },
                { label: "판매자", key: "판매자" },
                { label: "구매자", key: "구매자" },
                { label: "가격", key: "가격" },
                { label: "상태", key: "상태" },
                { label: "구매시기", key: "구매시기" },
                { label: "NFT이름", key: "NFT이름" },
                { label: "카테고리", key: "카테고리" },
                { label: "토큰id", key: "토큰id" },
              ]}
              filename={"구매목록.csv"}
            >
              주문 목록 다운로드
            </CSVLink>
            {isDeliverRequiredFilter && (
              <CSVLink
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                data={rows
                  .filter(
                    (row) => row.nftSaleId && checkedIds.includes(row.nftSaleId)
                  )
                  .map((row) => ({
                    구매번호: row.nftSaleId,
                    판매자: row.sellerName,
                    판매자번호: row.seller.phoneNumber,
                    구매자: row.buyerName,
                    구매자번호: row.buyer.shippingInfo.phoneNumber,
                    구매자주소: formetAddress(row.buyer.shippingInfo),
                    가격: row.price,
                    상태: covertStatus(row.status),
                    구매시기: moment(row.soldAt).format("YYYY-MM-DD HH:MM"),
                    NFT이름: row.nftName,
                    카테고리: row.category,
                    토큰id: `'${row.tokenId}'`,
                  }))}
                headers={[
                  { label: "구매번호", key: "구매번호" },
                  { label: "판매자", key: "판매자" },
                  { label: "판매자번호", key: "판매자번호" },
                  { label: "구매자", key: "구매자" },
                  { label: "구매자번호", key: "구매자번호" },
                  { label: "구매자주소", key: "구매자주소" },
                  { label: "가격", key: "가격" },
                  { label: "상태", key: "상태" },
                  { label: "구매시기", key: "구매시기" },
                  { label: "NFT이름", key: "NFT이름" },
                  { label: "카테고리", key: "카테고리" },
                  { label: "토큰id", key: "토큰id" },
                ]}
                filename={"배송목록.csv"}
              >
                배송 목록 다운로드
              </CSVLink>
            )}
            {isDeliverRequiredFilter && (
              <Button
                variant="contained"
                onClick={async () => {
                  if (checkedIds.length === 0) {
                    alert("선택된 항목이 없습니다.");
                    return;
                  }
                  setLoading(true);
                  const promises = checkedIds.map((id) =>
                    API.Admin.updateOrderDeliveryStatus(id, "CONFIRM")
                  );
                  await Promise.all(promises);
                  await refetch();
                  setLoading(false);
                }}
              >
                배송확인 처리
              </Button>
            )}
            {isDeliverRequiredFilter && (
              <Button
                variant="contained"
                onClick={async () => {
                  if (checkedIds.length === 0) {
                    alert("선택된 항목이 없습니다.");
                    return;
                  }
                  setLoading(true);
                  const promises = checkedIds.map((id) =>
                    API.Admin.updateOrderDeliveryStatus(id, "DELIVERED")
                  );
                  await Promise.all(promises);
                  await refetch();
                  setLoading(false);
                }}
              >
                배송처리
              </Button>
            )}
            {isDeliverRequiredFilter && (
              <Button
                variant="contained"
                onClick={async () => {
                  if (checkedIds.length === 0) {
                    alert("선택된 항목이 없습니다.");
                    return;
                  }
                  if (
                    !confirm(
                      "다운로드는 오래 걸릴 수 있으며\n도중에 나가거나 새로고침시 다운로드가 중단될 수 있습니다.\n계속하시겠습니까?"
                    )
                  ) {
                    return;
                  }
                  setLoading(true);
                  const rows = orderList?.filter(
                    (info: NftSaleForAdmin) =>
                      checkedIds.includes(info.nftSaleId) &&
                      info.delivery?.bookImages
                  );
                  const promises = rows?.map((info: NftSaleForAdmin) =>
                    downloadZip(
                      info.delivery?.bookImages as string[],
                      String(info.nftSaleId)
                    )
                  );
                  await Promise.all(promises);
                  setLoading(false);
                }}
              >
                복각본 다운로드
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 20 }} />
      <Box sx={{ height: 800, width: "100%" }}>
        {isLoading || isFetching ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            loading...
          </div>
        ) : (
          <>
            <UserModal
              userInfo={userInfo}
              closeModal={() => setUserInfo(undefined)}
            />
            <DataGrid
              rows={rows}
              columns={columns}
              sx={{
                width: "100%",
              }}
              checkboxSelection
              onRowSelectionModelChange={(e) => {
                setCheckedIds(e as number[]);
              }}
            />
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPage}
            page={page}
            onChange={(e, page) => {
              setPage(page);
            }}
          />
          {limit && setLimit && (
            <Select
              placeholder="선택해주세요"
              sx={{ width: "100px", height: "40px" }}
              value={limit}
              onChange={(event: SelectChangeEvent<number>) => {
                setLimit(Number(event.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 30, 50, 100, 200, 300].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default OrderList;

const covertStatus = (status: string) => {
  switch (status) {
    case "SOLD_OUT":
      return "확인전";
    case "CONFIRM":
      return "확인완료";
    default:
      return "알 수 없음";
  }
};

const formetAddress = (shippingInfo: Shipping) => {
  return `[${shippingInfo.postCode}] ${shippingInfo.mainAddress} ${shippingInfo.detailAddress}`;
};
