/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { SideItem } from "../components";
import { DashboardOutlined, SettingsOutlined } from "@mui/icons-material";
import { sideItems } from "../constants/index";
import profileImage from "../assets/images/profile.jpeg";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setToggled } from "../state/global/GlobalSlice";

const SideBar = ({ user }) => {
  const collapsed = useSelector((state) => state.global.collapsed);
  const toggled = useSelector((state) => state.global.toggled);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Sidebar
      collapsed={collapsed}
      onBackdropClick={() => {
        toggled && dispatch(setToggled());
      }}
      toggled={toggled}
      breakPoint="942px"
      backgroundColor={theme.palette.background.alt}
      rootStyles={{
        color: theme.palette.secondary[200],
        border: 0,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2.5rem",
      }}
    >
      <Box
        sx={{
          border: 0,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2.25rem",
        }}
      >
        {/* Top Section */}
        <Box>
          <Menu
            menuItemStyles={{
              button: { ":hover": { background: "transparent" } },
            }}
          >
            <MenuItem
              rootStyles={{
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Golden"
                />
                {!collapsed && (
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    Golden
                  </Typography>
                )}
              </Box>
            </MenuItem>
          </Menu>
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
            {!collapsed ? "Client" : " "}
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
            {!collapsed ? "Sales" : " "}
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
            {!collapsed ? "Management" : " "}
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
        </Box>

        {/* Bottom Section */}
        <Menu
          menuItemStyles={{
            button: { ":hover": { background: "transparent" } },
          }}
        >
          <Divider />
          <MenuItem
            rootStyles={{
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  height: collapsed ? "30px" : "40px",
                  width: collapsed ? "30px" : "40px",
                }}
                alt={user.name}
                src={profileImage}
              />

              {!collapsed && (
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
              )}
              {!collapsed && (
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              )}
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
