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
      title: "Products",
      icon: <ShoppingCartOutlined />,
      path: "/products",
    },
    {
      title: "Customers",
      icon: <Groups2Outlined />,
      path: "/customers",
    },
    {
      title: "Transactions",
      icon: <ReceiptLongOutlined />,
      path: "/transactions",
    },
    {
      title: "Geography",
      icon: <PublicOutlined />,
      path: "/geography",
    },
  ],
  sales: [
    {
      title: "Overview",
      icon: <PointOfSaleOutlined />,
      path: "/overview",
    },
    {
      title: "Daily",
      icon: <TodayOutlined />,
      path: "/daily",
    },
    {
      title: "Monthly",
      icon: <CalendarMonthOutlined />,
      path: "/monthly",
    },
    {
      title: "Breakdown",
      icon: <PieChartOutlined />,
      path: "/breakdown",
    },
  ],
  management: [
    {
      title: "Admin",
      icon: <AdminPanelSettingsOutlined />,
      path: "/admin",
    },
    {
      title: "Performance",
      icon: <TrendingUpOutlined />,
      path: "/performance",
    },
  ],
};
