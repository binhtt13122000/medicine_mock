import { ROUTES } from "../../utils/routes";
export const routes = [
  {
    id: 1,
    name: "Tổng quan",
    path: ROUTES.DASHBOARD,
    icon: "/images/dashboard.png",
  },
  {
    id: 2,
    name: "Quản lý hóa đơn",
    path: ROUTES.DRUG,
    icon: "/images/order.png",
  },
  {
    id: 3,
    name: "Quản lí kho",
    icon: "/images/storage.png",
    children: [
      {
        id: 3.1,
        name: "Nhập từ nhà cung cấp",
        path: ROUTES.DRUG,
        icon: "/images/storage.png",
      },
      {
        id: 3.2,
        name: "Nhập tồn",
        path: ROUTES.DRUG,
        icon: "/images/storage.png",
      },
    ],
  },
  {
    id: 4,
    name: "Quản lí thuốc",
    path: ROUTES.DRUG,
    icon: "/images/drug.png",
  },
];
