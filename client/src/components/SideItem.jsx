/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const SideItem = ({ title, path, icon }) => {
  const theme = useTheme();
  const location = useLocation();
  return (
    <MenuItem
      component={<Link to={path} />}
      to={path}
      icon={icon}
      rootStyles={{
        backgroundColor:
          path === location.pathname
            ? theme.palette.secondary[300]
            : "transparent",
        color:
          path === location.pathname
            ? theme.palette.primary[600]
            : theme.palette.secondary[100],
      }}
    >
      {title}
    </MenuItem>
  );
};

export default SideItem;
