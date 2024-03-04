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
  Daily,
  Monthly,
  Breakdown,
  Admin,
  Performance,
} from "../scenes";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/geography" element={<Geography />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/breakdown" element={<Breakdown />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/performance" element={<Performance />} />
    </Route>
  )
);

export default Router;
