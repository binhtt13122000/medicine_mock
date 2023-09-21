import { Box, Drawer } from "@mui/material";
import React from "react";
import ListRoutes from "../ListRoutes";

export interface IDrawerBase {
  window?: () => Window;
  openDrawer: boolean;
  appbarHeight: number;
  handleDrawerToggle: () => void;
}
const DrawerBase: React.FC<IDrawerBase> = (props: IDrawerBase) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { md: props.openDrawer ? 250 : 60 }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          marginTop: "50px",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.openDrawer ? 250 : 60,
          },
        }}
      >
        <ListRoutes
          openDrawer={props.openDrawer}
          appbarHeight={props.appbarHeight}
          user={{
            firstName: "Huy",
            avatar: "x",
          }}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.openDrawer ? 250 : 60,
          },
        }}
        open
      >
        <ListRoutes
          openDrawer={props.openDrawer}
          appbarHeight={props.appbarHeight}
          user={{
            firstName: "Huy",
            avatar: "x",
          }}
        />
      </Drawer>
    </Box>
  );
};

export default DrawerBase;
