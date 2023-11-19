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
            ...warehouses
              .filter((x) => x.id !== 1)
              .map((x, index) => {
                return {
                  id: index + 1,
                  name: x.name,
                  type: x.type,
                  limitArea: x.limitArea,
                  alertArea: x.alertArea,
                  minTem: x.minTem,
                  maxTem: x.maxTem,
                };
              }),
          ]}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "name", headerName: "Tên kho", width: 200 },
            { field: "type", headerName: "Loại kho", width: 200 },
            {
              field: "limitArea",
              headerName: "Sức chứa tối đa (m3)",
              width: 150,
            },
            {
              field: "alertArea",
              headerName: "Sức chứa cảnh báo",
              width: 150,
            },
            {
              field: "minTem",
              headerName: "Nhiệt độ thấp nhất",
              width: 150,
            },
            {
              field: "maxTem",
              headerName: "Nhiệt độ cao nhất",
              width: 150,
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
