import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";
import useSnackbar from "../Snackbar/useSnackbar";
import fetch from "isomorphic-unfetch";
import AWS from "aws-sdk";

type IAppBarWithDrawer = {
  appbarHeight: number;
  handleDrawerToggle: () => void;
};

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = ({
  appbarHeight,
  handleDrawerToggle,
}) => {
  const [isPool, setPool] = React.useState(false);
  const [messages, setMessages] = React.useState<
    Array<{ id: string; body: string }>
  >([]);
  const showSnackbar = useSnackbar();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={3}
      color="primary"
      style={{
        zIndex: theme.zIndex.drawer + 1,
        height: appbarHeight,
        flexGrow: 1,
      }}
    >
      <Toolbar
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{ flexGrow: 1, cursor: "pointer" }}
          display="flex"
          gap={1}
          alignItems="center"
          onClick={() => router.push(ROUTES.ACCOUNT)}
        >
          <Image src="/images/medicine.png" alt="logo" width={40} height={40} />
          <Typography
            component="h4"
            fontWeight="300"
            fontSize="16px"
            whiteSpace="normal"
            lineHeight="1.2"
            color="#fff"
            sx={{ ml: 1 }}
          >
            Công ty dược Thanh Bình
          </Typography>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Báo cáo ngày</MenuItem>
            <MenuItem onClick={handleClose}>Báo cáo tháng</MenuItem>
            <MenuItem onClick={handleClose}>
              Báo cáo theo khoảng thời gian
            </MenuItem>
          </Menu>
          <Typography
            component="h3"
            fontWeight="300"
            fontSize="16px"
            whiteSpace="normal"
            lineHeight="1.2"
            color="#fff"
            marginRight="5px"
            sx={{
              display: { xs: "none", sm: "inline-block" },
              cursor: "pointer",
            }}
            onClick={() => {
              showSnackbar({
                children: (
                  <Box>
                    <Typography fontSize={16} variant="h6">
                      Cảnh báo nhiệt độ kho
                    </Typography>
                    <Typography fontSize={12}>
                      Nhiệt độ kho đang vượt quá nhiệt độ cho phép:{" "}
                      <strong>28&deg;C</strong>
                    </Typography>
                    <Typography fontSize={12}>
                      Ghi nhận vào: <strong>31/10/2021 15:00:00</strong>
                    </Typography>
                  </Box>
                ),
                severity: "error",
              });
            }}
          >
            Quản trị viên | Binh Truong
          </Typography>
          <Button onClick={handleMenu} color="inherit" sx={{ ml: 4 }}>
            <Typography
              component="h3"
              fontWeight="300"
              fontSize="16px"
              whiteSpace="normal"
              lineHeight="1.2"
              color="#fff"
            >
              Tải báo cáo
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithDrawer;
