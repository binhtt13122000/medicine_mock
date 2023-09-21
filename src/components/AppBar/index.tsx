import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";

type IAppBarWithDrawer = {
  appbarHeight: number;
  handleDrawerToggle: () => void;
};

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = ({
  appbarHeight,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const router = useRouter();

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
            Công ty dược ABC
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
            }}
          >
            Quản trị viên | Binh Truong
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithDrawer;