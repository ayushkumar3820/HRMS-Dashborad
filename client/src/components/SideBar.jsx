/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Box, Divider, Typography, TextField, InputAdornment } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { SideItem } from "../components";
import { Search as SearchIcon } from "@mui/icons-material";
import { sideItems } from "../constants/index";
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
      backgroundColor="#fff"
      rootStyles={{
        color: "#6B7280",
        border: 0,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2rem",
        boxShadow: "1px 0px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          border: 0,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "1rem",
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
                marginBottom: "1rem",
                padding: "0.5rem",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="0.75rem"
              >
                <Box
                  sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "4px",
                    backgroundColor: "#6366F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={logo}
                    alt="Logo"
                  />
                </Box>
                {!collapsed && (
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ color: "#111827" }}
                  >
                    LOGO
                  </Typography>
                )}
              </Box>
            </MenuItem>
          </Menu>

          {/* Search Bar */}
          {!collapsed && (
            <Box sx={{ padding: "0.5rem" }}>
              <TextField
                fullWidth
                placeholder="Search"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9CA3AF", fontSize: "1.25rem" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": {
                      borderColor: "#6366F1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366F1",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#111827",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Box>
          )}

          {/* Menu Sections */}
          <Box sx={{ marginTop: "1rem" }}>
            {/* Recruitment Section */}
            <Typography 
              variant="body2" 
              sx={{ 
                padding: "0.5rem", 
                color: "#9CA3AF",
                fontSize: "0.75rem",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {!collapsed ? "Recruitment" : " "}
            </Typography>
            <Menu
              menuItemStyles={{
                button: {
                  padding: "0.5rem",
                  borderRadius: "8px",
                  color: "#6B7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  ":hover": {
                    color: "#6366F1",
                    backgroundColor: "#F3F4F6",
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

            {/* Organization Section */}
            <Typography 
              variant="body2" 
              sx={{ 
                padding: "0.5rem", 
                marginTop: "1rem",
                color: "#9CA3AF",
                fontSize: "0.75rem",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {!collapsed ? "Organization" : " "}
            </Typography>
            <Menu
              menuItemStyles={{
                button: {
                  padding: "0.5rem",
                  borderRadius: "8px",
                  color: "#6B7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  ":hover": {
                    color: "#6366F1",
                    backgroundColor: "#F3F4F6",
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

            {/* Others Section */}
            <Typography 
              variant="body2" 
              sx={{ 
                padding: "0.5rem", 
                marginTop: "1rem",
                color: "#9CA3AF",
                fontSize: "0.75rem",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {!collapsed ? "Others" : " "}
            </Typography>
            <Menu
              menuItemStyles={{
                button: {
                  padding: "0.5rem",
                  borderRadius: "8px",
                  color: "#6B7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  ":hover": {
                    color: "#6366F1",
                    backgroundColor: "#F3F4F6",
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
        </Box>

        {/* Bottom Section */}
        <Box sx={{ marginTop: "auto" }}>
          <Divider sx={{ margin: "1rem 0" }} />
          <Menu
            menuItemStyles={{
              button: { ":hover": { background: "transparent" } },
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.25rem",
                }}
              >
                {!collapsed && (
                  <Box>
                    <Typography
                      sx={{
                        color: "#111827",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.75rem",
                      }}
                    >
                      {user.occupation}
                    </Typography>
                  </Box>
                )}
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default SideBar;