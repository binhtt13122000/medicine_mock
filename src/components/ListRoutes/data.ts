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
        name: "Quản lí danh mục kho",
        path: ROUTES.STORAGE,
        icon: "/images/storage.png",
      },
      {
        id: 3.2,
        name: "Quản lí danh mục thuốc",
        path: ROUTES.PRODUCT,
        icon: "/images/storage.png",
      },
    ],
  },
  {
    id: 4,
    name: "Quản lí thuốc",
    path: ROUTES.UNIT,
    icon: "/images/drug.png",
  },
];
