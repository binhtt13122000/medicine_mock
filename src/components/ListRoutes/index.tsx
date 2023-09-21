import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { routes } from "./data";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
  List,
  ListItemButton,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import RoutesCollapse from "./RoutesCollapse";
import _ from "lodash";

export type ChildrenType = {
  fatherIndex: number;
  selectedChildIndex: number;
  isOpen: boolean;
};

type ListRoutesType = {
  openDrawer: boolean;
  appbarHeight: number;
  user:
    | Partial<{
        firstName?: string;
        avatar?: string;
      }>
    | undefined;
};

const initialValue = {
  fatherIndex: -1,
  selectedChildIndex: -1,
  isOpen: false,
};

const ListRoutes: React.FC<ListRoutesType> = ({ appbarHeight, user, openDrawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const [openUserInfo, setOpenUserInfor] = useState<boolean>(false);

  const [openChildren, setOpenChildren] = useState<ChildrenType>(initialValue);
  useEffect(() => {
    let itemSelectedFromSessionStorage = null;
    let select: ChildrenType = initialValue;
    let split = router.asPath.slice(1).split("/");
    let routerExecute = split.length > 0 ? `/${split[0]}` : router.asPath;
    routes.forEach((item) => {
      if (!_.isEqual(select, initialValue)) {
        return;
      }
      if (item.path) {
        _.isEqual(routerExecute, item.path) &&
          (select = {
            fatherIndex: item.id,
            selectedChildIndex: item.id,
            isOpen: true,
          });
      } else if (item.children) {
        let objectSelected = item.children.find((item) =>
          _.isEqual(routerExecute, item.path)
        );
        objectSelected &&
          (select = {
            fatherIndex: item.id,
            selectedChildIndex: objectSelected.id,
            isOpen: true,
          });
      }
    });
    if (window.sessionStorage != undefined) {
      itemSelectedFromSessionStorage =
        window.sessionStorage.getItem("itemSelected");
    }
    if (itemSelectedFromSessionStorage !== null) {
      if (
        _.isEqual(
          select,
          JSON.parse(itemSelectedFromSessionStorage) &&
            !_.isEqual(select, initialValue)
        )
      ) {
        setOpenChildren(JSON.parse(itemSelectedFromSessionStorage));
      } else if (!_.isEqual(select, initialValue)) {
        setOpenChildren(select);
      } else if (
        !_.isEqual(JSON.parse(itemSelectedFromSessionStorage), initialValue)
      ) {
        setOpenChildren(JSON.parse(itemSelectedFromSessionStorage));
      }
    } else if (!_.isEqual(select, initialValue)) {
      setOpenChildren(select);
    }
  }, [router]);

  useEffect(() => {
    if (!_.isEqual(openChildren, initialValue)) {
      window.sessionStorage.setItem(
        "itemSelected",
        JSON.stringify(openChildren)
      );
    }
  }, [openChildren]);
  const handleListItemClick = (
    index: number,
    path: string | undefined,
    hasChildren: boolean,
    fatherIndex: number
  ) => {
    if (path) {
      router.push(path);
    }
    if (hasChildren) {
      setOpenChildren((prev) => {
        return {
          ...prev,
          fatherIndex: fatherIndex,
          selectedChildIndex: index,
          isOpen: prev.fatherIndex != fatherIndex ? true : !prev.isOpen,
        };
      });
    } else {
      setOpenChildren((prev) => {
        return {
          ...prev,
          selectedChildIndex: index,
          fatherIndex: fatherIndex,
          isOpen: true,
        };
      });
    }
  };

  const [open, setOpen] = useState(false);

  const changePasswordData = () => {
    // setOpenFormChangePassword(true);
  };

  const changeProfile = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Box
        style={{
          overflowY: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: `${appbarHeight}px`,
            backgroundColor: "#20252a",
            color: "#FFFFFF",
            overflow: "hidden",
            position: "relative",
          }}
        >
        </Box>
        {routes.map((item) => (
          <React.Fragment key={item.name}>
            <ListItem
              button
              key={item.name}
              onClick={() =>
                handleListItemClick(
                  item.id,
                  item.path,
                  Boolean(item.children),
                  item.id
                )
              }
              style={
                !item?.children && openChildren.fatherIndex === item.id
                  ? {
                      transition: "ease-in-out .4s",
                      borderRight: `3px solid ${theme.palette.primary.main}`,
                    }
                  : {}
              }
              selected={openChildren.fatherIndex === item.id}
            >
              <ListItemIcon
                style={{
                  minWidth: "40px",
                }}
              >
                <Image src={item.icon} width={30} height={30} alt={"icon"} />
              </ListItemIcon>
              {openDrawer && <ListItemText primary={`${item.name}`} />}
              {openDrawer && item?.children ? (
                openChildren.fatherIndex == item.id && openChildren.isOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item?.children ? (
              <RoutesCollapse
                item={item?.children}
                fatherId={item?.id}
                handleListItemClick={handleListItemClick}
                openChildren={openChildren}
              />
            ) : null}
          </React.Fragment>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default ListRoutes;
