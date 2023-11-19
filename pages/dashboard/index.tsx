import { NextPage } from "next";
import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { dashboard } from "../../src/components/data";
import { Pie, Line, Bar, Scatter } from "react-chartjs-2";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from "@/components/DatePickerWrapper";
import "chartjs-plugin-annotation";
import annotationPlugin from "chartjs-plugin-annotation";
import { South } from "@mui/icons-material";
import { warehouses } from "@/data/warehouse";
import { warehouseTime } from "@/data/warehouseTime";
import { products } from "@/data/product";

Chart.register(
  ArcElement,
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  annotationPlugin
);

const han = (time: number) => {
  let result: number[] = [];
  const x = warehouseTime.filter((x) => {
    return x.time === time;
  });

  [1, 2, 3, 4, 5, 6, 7].forEach((k) => {
    result.push(
      x
        .filter((x) => x.date === k)
        .map((a) => a.area)
        .reduce((a, b) => a + b, 0)
    );
  });
  return result;
};

function isDateGreater(targetDate: string) {
  const today = new Date();
  const futureDate = new Date(targetDate);
  today.setDate(today.getDate() + 10); // Add 10 days to the target date
  return futureDate > today;
}

function isDateNotGreater(targetDate: string) {
  const today = new Date();
  const futureDate = new Date(targetDate);
  today.setDate(today.getDate() + 10); // Add 10 days to the target date
  return futureDate <= today && futureDate > new Date();
}

function isExpire(targetDate: string) {
  const today = new Date();
  const futureDate = new Date(targetDate);
  return futureDate <= today;
}

const cal1sum = () => {
  return cal1(2) + cal1(3) + cal1(4) + cal1(5) + cal1(6);
};
const cal2sum = () => {
  return cal2(2) + cal2(3) + cal2(4) + cal2(5) + cal2(6);
};
const cal3sum = () => {
  return cal3(2) + cal3(3) + cal3(4) + cal3(5) + cal3(6);
};
const cal1 = (warehouseId: number) => {
  return products
    .filter((x) => x.warehouseId === warehouseId)
    .filter((x) => isDateGreater(x.expiredDate)).length;
};
const cal2 = (warehouseId: number) => {
  return products
    .filter((x) => x.warehouseId === warehouseId)
    .filter((x) => isDateNotGreater(x.expiredDate)).length;
};
const cal3 = (warehouseId: number) => {
  return products
    .filter((x) => x.warehouseId === warehouseId)
    .filter((x) => isExpire(x.expiredDate)).length;
};
const calX = (warehouseId: number) => {
  return products
    .filter((x) => x.warehouseId === warehouseId)
    .filter((x) => isDateNotGreater(x.expiredDate));
};

const calK = () => {
  return [...calX(2), ...calX(3), ...calX(4), ...calX(5), ...calX(6)];
};

type tplotOptions = {
  [key: string]: number;
};

const calM = (warehouseId: number) => {
  const t = products.filter((x) => x.warehouseId === warehouseId);
  const k: tplotOptions = {};
  t.forEach((m) => {
    if (k[m.productName] === undefined) {
      k[m.productName] = +m.quantity;
    } else {
      k[m.productName] = k[m.productName] + m.quantity;
    }
  });
  // console.log(k);
  return Object.keys(k).map((key) => {
    return { name: key, quantity: k[key] };
  });
};

const calMSum = () => {
  const x = [...calM(2), ...calM(3), ...calM(4), ...calM(5), ...calM(6)];
  const k: tplotOptions = {};
  x.forEach((m) => {
    if (k[m.name] === undefined) {
      k[m.name] = +m.quantity;
    } else {
      k[m.name] = k[m.name] + m.quantity;
    }
  });
  // console.log(k);
  return Object.keys(k).map((key) => {
    return { name: key, quantity: k[key] };
  });
};

// eslint-disable-next-line react/display-name
export const CustomStartDateInput = React.forwardRef((props, ref) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography
        variant="subtitle2"
        flexShrink={0}
        width={140}
        textAlign="right"
      >
        Từ ngày
      </Typography>
      <TextField inputRef={ref} size="small" fullWidth {...props} />
    </Stack>
  );
});

// eslint-disable-next-line react/display-name
export const CustomEndDateInput = React.forwardRef((props, ref) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography
        variant="subtitle2"
        flexShrink={0}
        width={140}
        textAlign="right"
      >
        Đến ngày
      </Typography>
      <TextField inputRef={ref} size="small" fullWidth {...props} />
    </Stack>
  );
});

const Home: NextPage = () => {
  const [startDate, setStartDate] = React.useState<Date | null | undefined>(
    null
  );
  const [endDate, setEndDate] = React.useState<Date | null | undefined>(null);

  const [warehouse, setWarehouse] = React.useState(warehouses[0]);

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
        Lọc dữ liệu
      </Typography>
      <Divider
        sx={{
          marginX: 2,
        }}
      ></Divider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          my: 2,
        }}
      >
        <DatePickerWrapper>
          <DatePicker
            selected={startDate}
            showYearDropdown
            showMonthDropdown
            id="Từ ngày"
            placeholderText="MM-DD-YYYY"
            customInput={<CustomStartDateInput />}
            onChange={(date: Date) => setStartDate(startDate)}
          />
        </DatePickerWrapper>
        <DatePickerWrapper>
          <DatePicker
            selected={endDate}
            showYearDropdown
            showMonthDropdown
            id="Đến ngày"
            placeholderText="MM-DD-YYYY"
            customInput={<CustomEndDateInput />}
            onChange={(date: Date) => setEndDate(endDate)}
          />
        </DatePickerWrapper>
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
                    data: [120, 200, 100, 20, 56, 410, 90].map(
                      (x) => x * 1000000
                    ),
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
                    data: [120, 200, 100, 20, 56, 410, 90].map(
                      (x) => x * 1000000
                    ),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "Xuất",
                    data: [150, 150, 180, 90, 75, 64, 91].map(
                      (x) => x * 1000000
                    ),
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                  },
                  {
                    label: "Tồn kho",
                    data: [46, 265, 465, 100, 752, 451, 993].map(
                      (x) => x * 1000000
                    ),
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
                        return +value / 100000 + "";
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            Quản lí sức chứa của kho (m<sup>3</sup>)
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(x) => x.name}
            options={warehouses}
            value={warehouse}
            onChange={(e, value) => setWarehouse(value || warehouses[0])}
            sx={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" label="Kho" />
            )}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            Top 5 loại thuốc tồn kho
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(x) => x.name}
            options={warehouses}
            value={warehouse}
            onChange={(e, value) => setWarehouse(value || warehouses[0])}
            sx={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" label="Kho" />
            )}
          />
        </Box>
      </Box>
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
                labels: Array.from({ length: 7 }, (value, index) => {
                  let date = new Date();
                  date.setDate(date.getDate() - (7 - (index + 1)));
                  return `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                }),
                datasets: [
                  {
                    label: "12AM",
                    data:
                      warehouse.id !== 1
                        ? warehouseTime
                            .filter(
                              (x) =>
                                x.warehouse === warehouse.id && x.time === 1
                            )
                            .sort((a, b) => a.date - b.date)
                            .map((x) => x.area)
                        : han(1),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                  {
                    label: "5PM",
                    data:
                      warehouse.id !== 1
                        ? warehouseTime
                            .filter(
                              (x) =>
                                x.warehouse === warehouse.id && x.time === 2
                            )
                            .sort((a, b) => a.date - b.date)
                            .map((x) => x.area)
                        : han(2),
                    backgroundColor: "rgb(54, 162, 235)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  annotation: {
                    annotations: {
                      label1: {
                        type: "label",
                        xValue: 0,
                        yValue: warehouse.alertArea + 800,
                        color: "red",
                        content: ["Cảnh báo"],
                        font: {
                          size: 12,
                        },
                      },
                      label2: {
                        type: "label",
                        xValue: 0,
                        yValue: warehouse.limitArea + 800,
                        color: "yellow",
                        content: ["Giới hạn"],
                        font: {
                          size: 12,
                        },
                      },
                      limit: {
                        type: "line",
                        yMin: warehouse.limitArea,
                        yMax: warehouse.limitArea,
                        borderWidth: 3,
                        borderColor: "yellow",
                        borderDash: [8, 8],
                        label: {
                          font: {
                            weight: "50",
                          },
                          rotation: "auto",
                        },
                      },
                      danger: {
                        type: "line",
                        yMin: warehouse.alertArea,
                        yMax: warehouse.alertArea,
                        borderWidth: 3,
                        borderColor: "red",
                        borderDash: [8, 8],
                        label: {
                          font: {
                            weight: "50",
                          },
                          rotation: "auto",
                        },
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    suggestedMax: warehouse.actualArea,
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function (value, index, ticks) {
                        return +value;
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
                labels:
                  warehouse.id !== 1
                    ? [
                        ...calM(warehouse.id)
                          .sort((a, b) => b.quantity - a.quantity)
                          .filter((x, index) => index < 5)
                          .map((x) => x.name),
                      ]
                    : [
                        ...calMSum()
                          .sort((a, b) => b.quantity - a.quantity)
                          .filter((x, index) => index < 5)
                          .map((x) => x.name),
                      ],
                datasets: [
                  {
                    label: "Số thuốc đang tồn kho",
                    data:
                      warehouse.id !== 1
                        ? [
                            ...calM(warehouse.id)
                              .sort((a, b) => b.quantity - a.quantity)
                              .filter((x, index) => index < 5)
                              .map((x) => x.quantity),
                          ]
                        : [
                            ...calMSum()
                              .sort((a, b) => b.quantity - a.quantity)
                              .filter((x, index) => index < 5)
                              .map((x) => x.quantity),
                          ],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgb(54, 162, 235)",
                  },
                ],
              }}
              options={{
                indexAxis: "y" as const,
                responsive: true,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                scales: {
                  x: {
                    min: 0,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 3,
          }}
        >
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
            Biểu đồ thống kê tồn kho
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(x) => x.name}
            options={warehouses}
            value={warehouse}
            onChange={(e, value) => setWarehouse(value || warehouses[0])}
            sx={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" label="Kho" />
            )}
          />
        </Box>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 3,
          }}
        >
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
            Biểu đồ trạng thái hàng hóa (số loại thuốc/lô)
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(x) => x.name}
            options={warehouses}
            value={warehouse}
            onChange={(e, value) => setWarehouse(value || warehouses[0])}
            sx={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" label="Kho" />
            )}
          />
        </Box>
      </Box>
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
                labels:
                  warehouse.id !== 1
                    ? [
                        ...calM(warehouse.id)
                          .sort((a, b) => b.quantity - a.quantity)
                          .map((x) => x.name),
                      ]
                    : [
                        ...calMSum()
                          .sort((a, b) => b.quantity - a.quantity)
                          .map((x) => x.name),
                      ],
                datasets: [
                  {
                    label: "Số lượng",
                    data:
                      warehouse.id !== 1
                        ? [
                            ...calM(warehouse.id)
                              .sort((a, b) => b.quantity - a.quantity)
                              .map((x) => x.quantity),
                          ]
                        : [
                            ...calMSum()
                              .sort((a, b) => b.quantity - a.quantity)
                              .map((x) => x.quantity),
                          ],
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
                labels: ["Sử dụng tốt", "Sắp hết hạn", "Quá hạn"],
                datasets: [
                  {
                    label: "Số lượng",
                    data:
                      warehouse.id !== 1
                        ? [
                            cal1(warehouse.id),
                            cal2(warehouse.id),
                            cal3(warehouse.id),
                          ]
                        : [cal1sum(), cal2sum(), cal3sum()],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
                    ],
                    borderWidth: 1,
                    hoverBorderWidth: 8,
                    hoverBorderColor: [
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 159, 64)",
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
                  {warehouse.id !== 1
                    ? calX(warehouse.id).map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography>{x.productName}</Typography>
                            <Typography variant="overline">
                              {
                                warehouses.find((x) => x.id === warehouse.id)
                                  ?.name
                              }
                              _{x.expiredDate}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    : calK().map((x, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography>{x.productName}</Typography>
                            <Typography variant="overline">
                              {x.expiredDate}_SL:{x.quantity}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
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
        Stock Level
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
        <Box width={"98%"} minHeight={"300px"}>
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
            <Scatter
              options={{
                plugins: {
                  annotation: {
                    annotations: {
                      limit: {
                        type: "line",
                        yMin: 600,
                        yMax: 600,
                        borderWidth: 3,
                        borderColor: "red",
                        borderDash: [8, 8],
                        label: {
                          font: {
                            weight: "50",
                          },
                          rotation: "auto",
                        },
                      },
                      limit1: {
                        type: "line",
                        xMax: 4.5,
                        xMin: 4.5,
                        xScaleID: "x",
                        yMax: 0,
                        yMin: 200,
                        yScaleID: "y",
                        borderWidth: 3,
                        borderColor: "green",
                        label: {
                          font: {
                            weight: "50",
                          },
                          rotation: "auto",
                          display: true,
                          content: "Stock Buffer",
                          backgroundColor: 'lightGreen',
                          borderRadius: 0,
                          color: 'green',
                        },
                        arrowHeads: {
                          start: {
                            display: true,
                          },
                          end: {
                            display: true,
                          },
                        },
                      },
                      limit2: {
                        type: "line",
                        xMax: 5.5,
                        xMin: 5.5,
                        xScaleID: "x",
                        yMax: 200,
                        yMin: 1000,
                        yScaleID: "y",
                        borderWidth: 3,
                        borderColor: "green",
                        label: {
                          font: {
                            weight: "50",
                          },
                          rotation: "auto",
                          display: true,
                          content: "Order Quantity",
                          backgroundColor: 'lightGreen',
                          borderRadius: 0,
                          color: 'green',
                        },
                        arrowHeads: {
                          start: {
                            display: true,
                          },
                          end: {
                            display: true,
                          },
                        },
                      },
                      limit3: {
                        type: "line",
                        xMax: 1,
                        xMin: 2,
                        xScaleID: "x",
                        yMax: 360,
                        yMin: 360,
                        yScaleID: "y",
                        borderWidth: 3,
                        borderColor: "green",
                        label: {
                          font: {
                            weight: "50",
                          },
                          backgroundColor: 'lightGreen',
                          borderRadius: 0,
                          color: 'green',
                          xAdjust: 3,
                          rotation: "auto",
                          display: true,
                          content: "Lead Time",
                          z: 30,
                        },
                        arrowHeads: {
                          start: {
                            display: true,
                          },
                          end: {
                            display: true,
                          },
                        },
                      },
                    },
                  },
                },
                scales: {
                  p: {
                    position: "right",
                    suggestedMax: 1000,
                    min: 0,
                    ticks: {
                      stepSize: 200,
                      callback: function (value, index, ticks) {
                        switch (value) {
                          case 200:
                            return "Min. Stock Level";
                            break;
                          case 600:
                            return "Re-order Stock Level";
                            break;
                          case 1000:
                            return "Max. Stock Level";
                            break;
                        }
                      },
                    },
                  },
                  y: {
                    min: 0,
                    suggestedMax: 1000,
                    ticks: {
                      stepSize: 200,
                      // Include a dollar sign in the ticks
                    },
                    title: {
                      text: "Stock Level",
                      display: true,
                      font: {
                        size: 20,
                        weight: "800",
                      },
                    },
                  },
                  x: {
                    ticks: {
                      stepSize: 1,
                      callback: function (value, index, ticks) {
                        return "T" + (+value + 1);
                      },
                    },
                    title: {
                      text: "Thời gian",
                      display: true,
                      font: {
                        size: 20,
                        weight: "800",
                      },
                    },
                  },
                },
              }}
              data={{
                labels: Array.from({ length: 12 }, (value, index) => {
                  return `T${index + 1}`;
                }),
                datasets: [
                  {
                    label: "Stock level",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 2,
                    showLine: true,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    pointRadius: 10,
                    data: [
                      {
                        x: 0,
                        y: 1000,
                      },
                      {
                        x: 1,
                        y: 600,
                      },
                      {
                        x: 2,
                        y: 200,
                      },
                      {
                        x: 2,
                        y: 1000,
                      },
                      {
                        x: 3,
                        y: 600,
                      },
                      {
                        x: 4,
                        y: 200,
                      },
                      {
                        x: 4,
                        y: 1000,
                      },
                      {
                        x: 5,
                        y: 600,
                      },
                      {
                        x: 6,
                        y: 200,
                      },
                      {
                        x: 6,
                        y: 1000,
                      },
                      {
                        x: 7,
                        y: 600,
                      },
                      {
                        x: 8,
                        y: 200,
                      },
                      {
                        x: 8,
                        y: 1000,
                      },
                      {
                        x: 9,
                        y: 600,
                      },
                      {
                        x: 10,
                        y: 200,
                      },
                      {
                        x: 10,
                        y: 1000,
                      },
                      {
                        x: 11,
                        y: 600,
                      },
                      {
                        x: 12,
                        y: 200,
                      },
                    ],
                  },
                ],
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
