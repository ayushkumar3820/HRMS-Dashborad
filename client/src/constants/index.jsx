import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  Groups2Outlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

export const sideItems = {
  client: [
    {
      title: "Candidate",
      icon: <ShoppingCartOutlined />,
      path: "/dashboard",
    },
  ],
  sales: [
    {
      title: "Employee",
      icon: <PointOfSaleOutlined />,
      path: "/overview",
    },
    {
      title: "Attendance",
      icon: <TodayOutlined />,
      path: "/AttendanceDashboard",
    },
    {
      title: "Leave",
      icon: <CalendarMonthOutlined />,
      path: "/LeaveSection",
    },
    
  ],
  management: [
    {
      title: "Logout",
      icon: <AdminPanelSettingsOutlined />,
      path: "/Logout",
    },
   
  ],
};
