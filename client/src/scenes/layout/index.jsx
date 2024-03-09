import { Box } from "@mui/material";
import { Navbar, SideBar } from "../../components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../state/api/adminApi";

const Layout = () => {
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserByIdQuery(userId);
  return (
    <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
      <SideBar user={data || {}} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "100%",
        }}
      >
        <Navbar user={data || {}} />
        <Box sx={{ overflowY: "auto", flexGrow: 1, maxWidth: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
