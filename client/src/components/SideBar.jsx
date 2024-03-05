import { useTheme } from "@emotion/react";
import { Toolbar, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { SideItem } from "../components";
import { DashboardOutlined } from "@mui/icons-material";
import { sideItems } from "../constants/index";

const SideBar = () => {
  const theme = useTheme();
  return (
    <Sidebar
      backgroundColor={theme.palette.background.alt}
      rootStyles={{
        color: theme.palette.secondary[200],
        border: 0,
        height: "100%",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Menu
          menuItemStyles={{
            button: { ":hover": { background: "transparent" } },
          }}
        >
          <MenuItem>
            <Typography variant="h4" fontWeight="bold">
              ECOMVISION
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              color: theme.palette.primary[600],
              background: theme.palette.secondary[300],
              transition: ".4s ease",
            },
          },
        }}
      >
        <SideItem
          title="Dashboard"
          path="/dashboard"
          icon={<DashboardOutlined />}
        />
      </Menu>

      {/* Client Facing */}
      <Typography variant="h6" sx={{ m: "2.25rem 0 1rem 20px" }}>
        Client Facing
      </Typography>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              color: theme.palette.primary[600],
              background: theme.palette.secondary[300],
              transition: ".4s ease",
            },
          },
        }}
      >
        {sideItems.client.map((item, index) => (
          <SideItem
            key={index}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </Menu>

      {/* Sales */}
      <Typography variant="h6" sx={{ m: "2.25rem 0 1rem 20px" }}>
        Sales
      </Typography>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              color: theme.palette.primary[600],
              background: theme.palette.secondary[300],
              transition: ".4s ease",
            },
          },
        }}
      >
        {sideItems.sales.map((item, index) => (
          <SideItem
            key={index}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </Menu>

      {/* Management */}
      <Typography variant="h6" sx={{ m: "2.25rem 0 1rem 20px" }}>
        Management
      </Typography>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              color: theme.palette.primary[600],
              background: theme.palette.secondary[300],
              transition: ".4s ease",
            },
          },
        }}
      >
        {sideItems.management.map((item, index) => (
          <SideItem
            key={index}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
