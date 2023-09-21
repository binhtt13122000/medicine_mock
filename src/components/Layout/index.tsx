import { Box, CssBaseline, SxProps, Theme, Toolbar } from "@mui/material";
import React from "react";
import AppBarWithDrawer from "../AppBar";
import DrawerBase from "../Drawer";

const appbarHeight = 70;

const DefaultLayout: React.FC<{
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fc",
      }}
    >
      <CssBaseline />
      <AppBarWithDrawer
        appbarHeight={appbarHeight}
        handleDrawerToggle={handleDrawerToggle}
      />
      <DrawerBase
        appbarHeight={appbarHeight}
        openDrawer={openDrawer}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
