"use client";

import { API } from "@/service/api";
import { CombineDelivery, DeliveryStatus } from "@/types/combine";
import {
  Box,
  Button,
  FormHelperText,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DeliveryEditModal from "./DeliveryEditModal";
import { CSVLink } from "react-csv";
import useLoadinStore from "@/store/loading";
import moment from "moment";
import { downloadZip } from "@/util/zip";

// const chageStateuName = (status: DeliveryStatus) => {
//   switch (status) {
//     case DeliveryStatus.READY:
//       return "확인전";
//     case DeliveryStatus.CONFIRM:
//       return "확인완료";
//     case DeliveryStatus.DELIVERED:
//       return "배송완료";
//   }
// };

const SelectStatusCell = (
  props: GridRenderCellParams & {
    setRows: React.Dispatch<React.SetStateAction<any[]>>;
  }
) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    const _value = event.target.value;
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value as DeliveryStatus,
    });
    await API.Admin.updateDelivery(Number(id), {
      status: String(_value) as DeliveryStatus,
    });
    props.setRows((prev: any) => {
      return prev.map((row: any) => {
        if (row.id === id) {
          return { ...row, status: _value };
        }
        return row;
      });
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  if (value === DeliveryStatus.DELIVERED) {
    return <option value={DeliveryStatus.DELIVERED}>DELIVERED</option>;
  }
  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option value={DeliveryStatus.READY}>READY</option>
      <option value={DeliveryStatus.CONFIRM}>CONFIRM</option>
    </Select>
  );
};

function CombineList() {
  const { data: deliveryList, refetch } = useQuery({
    queryKey: ["deliveryList"],
    queryFn: () =>
      API.Admin.getDeliverReqeustList().then((res) => res.data.data.data),
  });
  const [rows, setRows] = React.useState<any[]>([]);
  const [modalData, setModalData] = React.useState<any>(null);
  const setLoading = useLoadinStore((s) => s.setLoading);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "이름", width: 120 },
    {
      field: "phoneNumber",
      headerName: "폰번호",
      width: 150,
    },
    {
      field: "userAddress",
      headerName: "지갑 주소",
      width: 450,
    },
    {
      field: "postCode",
      headerName: "우편번호",
      width: 150,
    },
    {
      field: "mainAddress",
      headerName: "메인 주소",
      width: 300,
    },
    {
      field: "detailAddress",
      headerName: "상세 주소",
      width: 300,
    },
    {
      field: "createdAt",
      headerName: "요청 날짜",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>{moment(params.row.createdAt).format("YYYY-MM-DD HH:MM")}</div>
        );
      },
    },
    {
      field: "status",
      headerName: "상태",
      width: 150,
      editable: true,
      renderEditCell: (params: GridRenderCellParams) => {
        return <SelectStatusCell {...params} setRows={setRows} />;
      },
    },
    {
      field: "down",
      headerName: "다운로드",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
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
      field: "button",
      headerName: "수정",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <button
            onClick={() => {
              setModalData(params.row);
            }}
          >
            수정
          </button>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (deliveryList) {
      const _rows = deliveryList?.map((info: CombineDelivery, idx: number) => {
        return {
          id: info.combineDeliveryId,
          name: info.name,
          phoneNumber: info.phoneNumber,
          userAddress: info.userAddress,
          postCode: info.postCode,
          mainAddress: info.mainAddress,
          detailAddress: info.detailAddress,
          status: info.status,
          bookImages: info.bookImages,
        };
      });
      setRows(_rows);
    }
  }, [deliveryList]);

  return (
    <div>
      <CSVLink
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "10px",
        }}
        data={rows
          .filter((row) => row.status === DeliveryStatus.CONFIRM)
          .map((row) => ({
            id: row.id,
            이름: row.name,
            폰번호: row.phoneNumber,
            우편번호: row.postCode,
            메인주소: row.mainAddress,
            상세주소: row.detailAddress,
            요청날짜: row.createdAt,
          }))}
        headers={[
          { label: "id", key: "id" },
          { label: "이름", key: "이름" },
          { label: "폰번호", key: "폰번호" },
          { label: "우편번호", key: "우편번호" },
          { label: "메인주소", key: "메인주소" },
          { label: "상세주소", key: "상세주소" },
          { label: "요청날짜", key: "요청날짜" },
        ]}
        filename={"배송처리목록.csv"}
        onClick={(e: any) => {
          setLoading(true);
          const ids = rows
            .filter((row) => row.status === DeliveryStatus.CONFIRM)
            .map((row) => row.id);
          if (ids.length === 0) {
            alert("CONFIRM된 배송이 없습니다.");
            e.preventDefault();
            setLoading(false);
            return;
          }
          const promises = ids.map((id) =>
            API.Admin.updateDelivery(Number(id), {
              status: DeliveryStatus.DELIVERED,
            })
          );
          Promise.all(promises).then(() => {
            setLoading(false);
            refetch();
          });
        }}
      >
        베송처리 및 엑셀 다운로드
      </CSVLink>
      <Box sx={{ display: "flex", flexDirection: "row", height: 10 }} />
      <FormHelperText>
        CONFIRM된 것만 다운로드 됩니다. 다운로드되면 DELIVERED 상태로
        변경됩니다.
      </FormHelperText>
      <FormHelperText>- READY: 확인전</FormHelperText>
      <FormHelperText>- CONFIRM: 확인완료</FormHelperText>
      <FormHelperText>
        - DELIVERED: 배송처리완료(변경 불가합니다)
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      <DeliveryEditModal
        modalData={modalData}
        closeModal={() => setModalData(null)}
        refetch={refetch}
      />
      <Box sx={{ height: 800, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </div>
  );
}

export default CombineList;
