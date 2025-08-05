// App.tsx
import React from "react";
import "./icons/fontawesome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoMarketDashboard from "./components/InfoMarketDashboard";
import Home from "./components/Home";
import Accessories from "./components/Accessories";
import Bags from "./components/Bags";
import Curteins from "./components/Curtains";
import Computers from "./components/Computers";
import Phones from "./components/Phones";
import Settings from "./components/Settings";
import Help from "./components/Help";
import SellYourItem from "./components/SellYourItem";
import CreateAccount from "./components/CreateAccount";
import LoginPage from "./components/LoginPage";
import UploadItem from "./components/mini-components/UploadItem";
import Notifications from "./components/Notifications";
import ItemDetail from "./components/admin/ItemDetail";
import ItemList from "./components/admin/ItemList";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminList from "./components/admin/AdminList";
import SalesList from "./components/admin/SalesList";
import SellerList from "./components/admin/SellerList";
import UserList from "./components/admin/UserList";
import UserDetail from "./components/admin/UserDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoMarketDashboard />}>
          <Route index element={<Home />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="bags" element={<Bags />} />
          <Route path="curteins" element={<Curteins />} />
          <Route path="computers" element={<Computers />} />
          <Route path="phones" element={<Phones />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="sell-your-item" element={<SellYourItem />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="upload-item" element={<UploadItem />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="admins" element={<AdminList />} />
          <Route path="items" element={<ItemList />} />
          <Route path="items/:itemId" element={<ItemDetail />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sellers" element={<SellerList />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetail />} />
          {/* More admin routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


