"use client";

import React from "react";
import {
  DataGrid,
  GridRenderCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service/api";
import {
  Box,
  Button,
  FormHelperText,
  Input,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { User, UserRole, LoginType } from "@/type/user";
import moment from "moment";

const SelectUserCell = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value;
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: value,
    });

    const email = props.row.email;
    const loginType = props.row.loginType as LoginType;
    await API.User.changeRole(String(email), loginType, value as UserRole);
    apiRef.current.stopCellEditMode({ id, field });
  };
  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
      <option value="CREATOR">CREATOR</option>
    </Select>
  );
};

const renderSelectEditInputCell = (params: any) => {
  return <SelectUserCell {...params} />;
};

function UserList() {
  const [page, setPage] = React.useState<number>(1);
  const [searchType, setSearchType] = React.useState<string>("name");
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const {
    data: userList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userList", page],
    queryFn: () =>
      API.User.getUsers(page, searchType, searchKeyword).then(
        (res) => res.data
      ),
  });
  console.log("📢 유저 목록 API 응답:", userList);
  console.log("📢 API 요청 데이터:", { page, searchType, searchKeyword });
  const [rows, setRows] = React.useState<any[]>([]);

  const columns = [
    { field: "name", headerName: "name", width: 120 },
    {
      field: "phoneNumber",
      headerName: "phoneNumber",
      width: 150,
    },
    {
      field: "role",
      headerName: "role",
      width: 110,
      editable: true,
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "userAddress",
      headerName: "userAddress",
      width: 450,
    },
    {
      field: "loginType",
      headerName: "loginType",
      width: 110,
    },
    {
      field: "creatorName",
      headerName: "creatorName",
      width: 110,
    },
    {
      field: "email",
      headerName: "email",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "가입날짜",
      width: 230,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>{moment(params.row.createdAt).format("YYYY-MM-DD HH:MM")}</div>
        );
      },
    },
  ];

  React.useEffect(() => {
    console.log("📢 userList 전체 데이터:", userList); // 전체 userList 확인

    if (userList) {
      if (userList.users === undefined) return;
      const _rows = userList.users?.map((user: User, idx: number) => {
        return {
          id: `${user.email}_${user.loginType}`,
          name: user.name,
          phoneNumber: user.phoneNumber ?? "",
          role: user.role ?? "USER",
          userAddress: user.userAddress,
          loginType: user.loginType,
          creatorName: user.creatorName,
          email: user.email,
          createdAt: user.createdAt,
        };
      });
      setRows(_rows);
    }
  }, [userList]);

  const onSearch = async () => {
    setPage(1);
    await refetch();
  };

  if (!userList || isLoading) return <div>loading...</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"email"}>Email</MenuItem>
          <MenuItem value={"userAddress"}>Useraddress</MenuItem>
          {/* <MenuItem value={"phoneNumber"}>phoneNumber</MenuItem> */}
        </Select>
        <Box sx={{ width: 20 }} />
        <Input
          style={{ width: 400 }}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Box sx={{ width: 20 }} />
        <Button variant="contained" onClick={onSearch}>
          검색
        </Button>
      </Box>
      <FormHelperText>
        검색할때는 일부 입력 검색이 불가능하고 전체 입력 검색만 가능합니다.
        폰번호는 -를 붙여서 검색해야합니다.
      </FormHelperText>
      <Box sx={{ height: 20 }} />
      {userList.totalCount === 0 ? (
        <div>해당하는 유저가 없습니다</div>
      ) : (
        <>
          <DataGrid rows={rows} columns={columns} hideFooter />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              page={page}
              count={userList.totalPage}
              color="primary"
              onChange={(e, page) => {
                setPage(page);
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default UserList;
