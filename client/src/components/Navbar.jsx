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
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import profileImage from "../assets/images/profile.jpg";

const Navbar = () => {
  const theme = useTheme();
  return (
    <Box>
      <Toolbar sx={{ p: 0, bgColor: "black", justifyContent: "space-between" }}>
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton>
            <MenuOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <Box
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </Box>
        </Box>

        {/* RIGHT SECTION */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton>
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <Box>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "Capitalize",
                gap: "1rem",
              }}
            >
              <Avatar
                sx={{ height: "32px", width: "32px" }}
                alt="Remy Sharp"
                src={profileImage}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Remy Sharp
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Pharmacist
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
