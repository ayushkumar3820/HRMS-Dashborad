import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Layout,
  Dashboard,
  Products,
  Customers,
  Transactions,
  Geography,
  Overview,
  AttendanceDashboard,
  LeaveSection,
  Breakdown,
  Logout1,  
  Performance,
} from "../scenes";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="customers" element={<Customers />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="geography" element={<Geography />} />
      <Route path="overview" element={<Overview />} />
      <Route path="AttendanceDashboard" element={<AttendanceDashboard />} /> {/* Match the URL case */}
      <Route path="LeaveSection" element={<LeaveSection />} /> {/* Match the URL case */}
      <Route path="breakdown" element={<Breakdown />} />
      <Route path="logout" element={<Logout1 />} />
      <Route path="performance" element={<Performance />} />
    </Route>
  )
);

export default Router;