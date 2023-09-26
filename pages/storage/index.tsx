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

const Storage: NextPage = () => {
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
        QUẢN LÍ KHO
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
              name: "Kho 1",
              ratio: "20.000",
              quantity: "15.000",
              alert: "Nhiệt độ: 20C - 30C, Độ ẩm: 55%-75%",
              status: "Hoạt động bình thường",
            },
            {
              id: 2,
              code: "002",
              name: "Kho 2",
              quantity: "10.000",
              ratio: "20.000",
              alert: "Nhiệt độ: 20C - 30C, Độ ẩm: 55%-75%",
              status: "Hoạt động bình thường",
            },
            {
              id: 3,
              code: "003",
              name: "Kho 3",
              quantity: "5000",
              ratio: "20.000",
              alert: "Nhiệt độ: 20C - 30C, Độ ẩm: 55%-75%",
              status: "Cảnh báo: Nhiệt độ 35C",
            },
          ]}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "code", headerName: "Mã kho" },
            { field: "name", headerName: "Tên kho" },
            {
              field: "ratio",
              headerName: "Sức chứa tối đa",
              width: 200,
            },
            {
              field: "quantity",
              headerName: "Số lượng trong kho",
              width: 200,
            },
            {
              field: "alert",
              headerName: "Điều kiện an toàn",
              width: 350,
            },
            {
              field: "status",
              headerName: "Tình trạng",
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

export default Storage;
