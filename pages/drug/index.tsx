import { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Drug: NextPage = () => {
  return (
    <Box p={1} sx={{ width: "100%" }}>
      <Typography
        component="h3"
        fontWeight="300"
        fontSize="20px"
        whiteSpace="normal"
        lineHeight="1.2"
        // color="#fff"
        marginX={2}
        sx={{
          display: { xs: "none", sm: "inline-block" },
          mt: 3,
        }}
      >
        TỒN KHO HÀNG HÓA
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          ml: 2,
          mt: 3,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            label="Từ ngày"
            value={"01/09/2023"}
          />
        </Box>
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            label="Tới ngày"
            value={"22/09/2023"}
          />
        </Box>
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            label="Trạng thái hàng hóa"
            value={"Tất cả"}
          />
        </Box>
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            label="Loại hàng hóa"
            value={"Tất cả"}
          />
        </Box>
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            label="Nhóm hàng"
            value={"Tất cả"}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          ml: 2,
          mt: 3,
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box width={"18%"}>
          <TextField
            fullWidth
            variant="standard"
            label="Hạn sử dụng"
            value={"Tất cả"}
          />
        </Box>
        <Box width={"59%"}>
          <TextField fullWidth variant="standard" label="Tìm kiếm" value={""} />
        </Box>
        <Box width={"18%"}>
          <Button variant="outlined">Tìm kiếm</Button>
        </Box>
      </Box>
      <Box sx={{ height: 400, width: "100%", pt: 3 }}>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={[
            {
              groupId: "Tồn đầu",
              headerAlign: "center",
              children: [{ field: "tontruoc" }, { field: "tontruocT" }],
            },
            {
              groupId: "Nhập thêm",
              headerAlign: "center",
              children: [{ field: "tonsau" }, { field: "tonsauT" }],
            },
          ]}
          rows={[
            {
              id: 1,
              code: "001",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
            {
              id: 2,
              code: "002",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
            {
              id: 3,
              code: "003",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
            {
              id: 4,
              code: "004",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
            {
              id: 5,
              code: "005",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
            {
              id: 6,
              code: "006",
              name: "Viên uống B Complex Vitamin Royal Care",
              lo: "001",
              expire: "12/12/2024",
              price: "0.00",
              dvt: "Hộp",
              amount: 100,
              tontruoc: 100,
              tontruocT: "0.00",
              tonsau: 0,
              tonsauT: "0.00",
            },
          ]}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "code", headerName: "Mã hàng hóa" },
            { field: "name", headerName: "Tên hàng hóa", width: 350 },
            {
              field: "lo",
              headerName: "Số lô",
            },
            {
              field: "expire",
              headerName: "Hạn dùng",
            },
            {
              field: "price",
              headerName: "Đơn giá",
            },
            {
              field: "dvt",
              headerName: "ĐVT",
            },
            {
              field: "amount",
              headerName: "Tồn hiện tại",
              type: "number",
            },
            {
              field: "tontruoc",
              headerName: "Số lượng",
              type: "number",
            },
            {
              field: "tontruocT",
              headerName: "Số tiền",
            },
            {
              field: "tonsau",
              headerName: "Số lượng",
              type: "number",
            },
            {
              field: "tonsauT",
              headerName: "Số tiền",
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          showColumnVerticalBorder
          showCellVerticalBorder
          scrollbarSize={3}
        />
      </Box>
    </Box>
  );
};

export default Drug;
