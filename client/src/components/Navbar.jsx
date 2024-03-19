/* eslint-disable react/prop-types */
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setCollapsed, setToggled } from "../state/global/GlobalSlice";
import profileImage from "../assets/images/profile.jpeg";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const collapsed = useSelector((state) => state.global.collapsed);
  const toggled = useSelector((state) => state.global.toggled);
  const mdDevice = useMediaQuery("(max-width: 942px)");
  const smDevice = useMediaQuery("(max-width: 686px)");
  const xsDevice = useMediaQuery("(max-width: 370px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py="10px"
      px={1.5}
    >
      {/* LEFT SECTION */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <IconButton
          onClick={() => {
            if (mdDevice) {
              collapsed && dispatch(setCollapsed());
              !toggled && dispatch(setToggled());
            } else {
              dispatch(setCollapsed());
              toggled && dispatch(setToggled());
            }
          }}
        >
          <MenuOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        {!smDevice && (
          <Box
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* RIGHT SECTION */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <IconButton onClick={() => dispatch(setMode())}>
          <DarkModeOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton>
          <SettingsOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <Menu
          menuStyle={{
            background: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          }}
          menuButton={
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
                gap: "10px",
              }}
            >
              <Avatar
                sx={{ height: "32px", width: "32px" }}
                alt={user.name}
                src={profileImage}
              />
              {!xsDevice && (
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
              )}
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
          }
          transition
        >
          <MenuItem>Log Out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
