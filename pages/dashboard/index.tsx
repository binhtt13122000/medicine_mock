import { NextPage } from "next";
import React from "react";
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { dashboard } from "../../src/components/data";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Home: NextPage = () => {
  return (
    <Box p={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="stretch"
        marginY={2}
        marginX={2}
      >
        {dashboard.map((data) => {
          return (
            <Box
              key={data.id}
              sx={{
                paddingRight: { md: 3, xs: 0 },
                cursor: "pointer",
              }}
              width={"25%"}
              onClick={() => {}}
            >
              <Box
                sx={{
                  backgroundColor: data.color,
                  py: "15px",
                  pr: "10px",
                  pl: "20px",
                  borderRadius: 1,
                  width: "100%",
                  display: "flex",
                  boxShadow: 6,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "50px",
                  }}
                >
                  <Typography
                    align="right"
                    component="h2"
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    noWrap
                    color="white"
                    sx={{ pb: 1 }}
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    align="right"
                    fontSize="14px"
                    fontWeight="600"
                    lineHeight="24px"
                    color="white"
                  >
                    {data.before}
                  </Typography>
                  <Typography
                    align="right"
                    component="h5"
                    fontSize="14px"
                    fontWeight="600"
                    lineHeight="24px"
                    color="white"
                  >
                    {data.now}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Typography
        component="h3"
        fontWeight="300"
        fontSize="18px"
        whiteSpace="normal"
        lineHeight="1.2"
        // color="#fff"
        marginX={2}
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        Quản lí doanh số
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        alignItems="stretch"
        marginY={2}
        marginX={2}
      >
        <Box width={"49%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              px: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Bar
              // height={"30%"}
              data={{
                labels: Array.from({ length: 12 }, (value, index) => {
                  return `T${index + 1}`;
                }),
                datasets: [
                  {
                    label: "Doanh số",
                    data: [120, 200, 100, 20, 56, 410, 90].map(x => x * 1000000),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: "Quản lí doanh số theo tháng",
                    font: {
                      size: 18,
                    },
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    suggestedMax: 500000000,
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, ticks) {
                        return +value / 1000000 + "M VND";
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
        <Box width={"49%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              px: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Bar
              // height={"30%"}
              data={{
                labels: Array.from({ length: 12 }, (value, index) => {
                  return `T${index + 1}`;
                }),
                datasets: [
                  {
                    label: "Nhập",
                    data: [120, 200, 100, 20, 56, 410, 90].map(x => x * 1000000),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "Xuất",
                    data: [150, 150, 180, 90, 75, 64, 91].map(x => x * 1000000),
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                  {
                    label: "Tồn kho",
                    data: [46, 265, 465, 100, 752, 451, 993].map(x => x * 1000000),
                    backgroundColor: "rgba(255, 205, 86, 0.5)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: "Xuất/nhập thuốc theo tháng",
                    font: {
                      size: 18,
                    },
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    suggestedMax: 500000000,
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, ticks) {
                        return +value / 1000000 + "M VND";
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Typography
        component="h3"
        fontWeight="300"
        fontSize="18px"
        whiteSpace="normal"
        lineHeight="1.2"
        // color="#fff"
        marginX={2}
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        Quản lí tồn kho
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        alignItems="stretch"
        marginY={2}
        marginX={2}
      >
        <Box width={"40%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              pr: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <Pie
              data={{
                labels: [
                  "Thực phẩm chức năng",
                  "Cảm cúm",
                  "Dạ dày",
                  "Thảo dược",
                  "Khác",
                ],
                datasets: [
                  {
                    label: "Phần trăm",
                    data: [45, 27, 14, 10, 4],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(255, 205, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(201, 203, 207, 0.2)",
                    ],
                    borderColor: [
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
                      "rgb(255, 205, 86)",
                      "rgb(75, 192, 192)",
                      "rgb(54, 162, 235)",
                      "rgb(153, 102, 255)",
                      "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                    hoverBorderWidth: 8,
                    hoverBorderColor: [
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
                      "rgb(255, 205, 86)",
                      "rgb(75, 192, 192)",
                      "rgb(54, 162, 235)",
                      "rgb(153, 102, 255)",
                      "rgb(201, 203, 207)",
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                  title: {
                    position: "top",
                    display: true,
                    text: "Biểu đồ thống kê tồn kho",
                    align: "center",
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
        <Box width={"40%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              pr: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <Pie
              data={{
                labels: ["Đạt chuẩn", "Sắp hết hạn", "Sắp hết hàng"],
                datasets: [
                  {
                    label: "Số lượng",
                    data: [80, 8, 6],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(255, 205, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(201, 203, 207, 0.2)",
                    ],
                    borderColor: [
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
                      "rgb(255, 205, 86)",
                      "rgb(75, 192, 192)",
                      "rgb(153, 102, 255)",
                      "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                    hoverBorderWidth: 8,
                    hoverBorderColor: [
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
                      "rgb(255, 205, 86)",
                      "rgb(75, 192, 192)",
                      "rgb(153, 102, 255)",
                      "rgb(201, 203, 207)",
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                  title: {
                    position: "top",
                    display: true,
                    text: "Biểu đồ trạng thái hàng hóa",
                    align: "center",
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
        <Box width={"15%"} minHeight={"300px"} maxHeight="300px">
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              pr: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <Box overflow="scroll" width="100%" height="100%">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" fontSize={16}>
                        Thuốc sắp hết hạn
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống Feroglobin B12 Vitabiotics
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống B Complex Vitamin Royal Care
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>Viên uống Tố Nữ Vương Royal Care</Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống Feroglobin B12 Vitabiotics bổ máu
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống B Complex Vitamin Royal Care
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>Viên uống Tố Nữ Vương Royal Care</Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống Feroglobin B12 Vitabiotics bổ máu
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        Viên uống B Complex Vitamin Royal Care
                      </Typography>
                      <Typography variant="overline">20/10/2023</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Typography
        component="h3"
        fontWeight="300"
        fontSize="18px"
        whiteSpace="normal"
        lineHeight="1.2"
        // color="#fff"
        marginX={2}
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        Quản lí nhiệt độ và độ ẩm
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        alignItems="stretch"
        marginY={2}
        marginX={2}
      >
        <Box width={"49%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              px: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Line
              height={"30%"}
              data={{
                labels: Array.from({ length: 24 }, (value, index) => {
                  return index < 10 ? `0${index}:00` : `${index}:00`;
                }),
                datasets: [
                  {
                    label: "Nhiệt độ (C)",
                    data: [10, 8, 12, 15, 12, 10, 9],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    yAxisID: "y",
                  },
                  {
                    label: "Độ ẩm (%)",
                    data: [65, 70, 72, 64, 60, 65, 70],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    yAxisID: "y1",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                  mode: "index" as const,
                  intersect: false,
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Nhiệt độ và độ ẩm của ngày hiện tại",
                    position: "top",
                    font: {
                      size: 18,
                    },
                  },
                },
                scales: {
                  y: {
                    min: -30,
                    max: 30,
                    type: "linear" as const,
                    display: true,
                    position: "left" as const,
                  },
                  y1: {
                    min: 40,
                    max: 100,
                    type: "linear" as const,
                    display: true,
                    position: "right" as const,
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
        <Box width={"49%"} minHeight={"300px"}>
          <Paper
            elevation={3}
            sx={{
              pt: 1,
              pb: 2,
              px: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Line
              height={"30%"}
              data={{
                labels: Array.from({ length: 7 }, (value, index) => {
                  return `T${index + 1}`;
                }),
                datasets: [
                  {
                    label: "Nhiệt độ (C)",
                    data: [10, 8, 12, 15],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    yAxisID: "y",
                  },
                  {
                    label: "Độ ẩm (%)",
                    data: [65, 70, 72, 64],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    yAxisID: "y1",
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                  mode: "index" as const,
                  intersect: false,
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Nhiệt độ và độ ẩm trung bình trong tuần",
                    position: "top",
                    font: {
                      size: 18,
                    },
                  },
                },
                scales: {
                  y: {
                    min: -30,
                    max: 30,
                    type: "linear" as const,
                    display: true,
                    position: "left" as const,
                  },
                  y1: {
                    min: 40,
                    max: 100,
                    type: "linear" as const,
                    display: true,
                    position: "right" as const,
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
