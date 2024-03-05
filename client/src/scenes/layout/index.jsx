import { Box } from "@mui/material";
import { Navbar, SideBar } from "../../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "100%",
        }}
      >
        <Navbar />
        <Box sx={{ overflowY: "auto", flexGrow: 1, maxWidth: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
