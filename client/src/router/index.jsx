import * as reactRouterDom from "react-router-dom";
import * as scenes from "../scenes";

const Router = reactRouterDom.createBrowserRouter(
  reactRouterDom.createRoutesFromElements(
    <>
      {/* Public Routes (No Sidebar) */}
      <reactRouterDom.Route path="signup" element={<scenes.LoginPage />} />
      <reactRouterDom.Route path="login" element={<scenes.LoginPage />} />

      {/* Protected Routes (With Sidebar) */}
      <reactRouterDom.Route path="/" element={<scenes.Layout />}>
        <reactRouterDom.Route index element={<reactRouterDom.Navigate to="login" replace />} />
        <reactRouterDom.Route path="dashboard" element={<scenes.Dashboard />} />
        <reactRouterDom.Route path="leave" element={<scenes.LeaveCalendar />} />
        <reactRouterDom.Route path="products" element={<scenes.Products />} />
        <reactRouterDom.Route path="customers" element={<scenes.Customers />} />
        <reactRouterDom.Route path="transactions" element={<scenes.Transactions />} />

        <reactRouterDom.Route path="overview" element={<scenes.Overview />} />
        <reactRouterDom.Route path="AttendanceDashboard" element={<scenes.AttendanceDashboard />} />
        <reactRouterDom.Route path="LeaveSection" element={<scenes.LeaveSection />} />
        <reactRouterDom.Route path="breakdown" element={<scenes.Breakdown />} />
        <reactRouterDom.Route path="logout" element={<scenes.Logout1 />} />
      </reactRouterDom.Route>
    </>
  )
);

export default Router;
