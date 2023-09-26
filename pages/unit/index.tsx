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

const Unit: NextPage = () => {
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
        CẤU HÌNH ĐƠN VỊ
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box sx={{ height: 400, width: "100%", pt: 3 }}>
        <DataGrid
          rows={[
            {
              id: 1,
              code: "001",
              name: "Viên",
              ratio: "",
              quantity: "30.000",
              description: "Thành phẩm cuối",
              baoquan: "Bảo quản nhiệt độ phòng",
            },
            {
              id: 2,
              code: "002",
              name: "Vỉ",
              ratio: "15 viên/vỉ",
              baoquan: "Bảo quản nhiệt độ phòng",
            },
            {
              id: 3,
              code: "003",
              name: "Hộp",
              ratio: "60 viên/hộp",
              baoquan: "Bảo quản nhiệt độ phòng",
            },
          ]}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "code", headerName: "Mã đơn vị" },
            { field: "name", headerName: "Tên đơn vị" },
            {
              field: "ratio",
              headerName: "Tỉ lệ",
            },
            {
              field: "quantity",
              headerName: "Số lượng trong kho",
              width: 200,
            },
            {
              field: "description",
              headerName: "Ghi chú",
              width: 350,
            },
            {
              field: "baoquan",
              headerName: "Bảo quản",
              width: 350,
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

export default Unit;
