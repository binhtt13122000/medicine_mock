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
import { warehouses } from "@/data/warehouse";
import { category } from "@/data/category";

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
        QUẢN LÍ THUỐC
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box sx={{ height: 400, width: "100%", pt: 3 }}>
        <DataGrid
          rows={[
            ...category
              .filter((x) => x.id !== 1)
              .map((x, index) => {
                return {
                  id: index + 1,
                  name: x.name,
                  category: x.category,
                  baoquan: x.baoquan,
                  expire: x.expire,
                };
              }),
          ]}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "name", headerName: "Tên thuốc", width: 300 },
            { field: "category", headerName: "Loại thuốc", width: 300 },
            {
              field: "baoquan",
              headerName: "Điều kiện bảo quản",
              width: 200,
            },
            {
              field: "expire",
              headerName: "Thời hạn sử dụng",
              width: 200,
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
