// App.tsx
import React from "react";
import "./icons/fontawesome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";;
import "./index.css";
import ProtectedRoute from "../src/auth/ProtectedRoute";
import { AuthProvider } from "../src/auth/AuthContext";
import InfoMarketDashboard from "./pages/InfoMarketDashboard";
import Home from "./pages/Home";
import Accessories from "./pages/Accessories";
import Bags from "./pages/Bags";
import Curteins from "./pages/Curtains";
import Computers from "./pages/Computers";
import Phones from "./pages/Phones";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import SellYourItem from "./pages/SellYourItem";
import UploadItem from "./pages/UploadItem";
import Notifications from "./pages/Notifications";
import ItemDetail from "./pages/admin/ItemDetail";
import ItemList from "./pages/admin/ItemList";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminList from "./pages/admin/AdminList";
import SalesList from "./pages/admin/SalesList";
import SellerList from "./pages/admin/SellerList";
import UserList from "./pages/admin/UserList";
import UserDetail from "./pages/admin/UserDetail";
import SellerDashboard from "./pages/SellerDashboard";
import SellerItems from "./pages/SellerItems";
import SellerProfile from "./pages/SellerProfile";
import UserProfile from "./pages/UserProfile";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      <div className="bg-white min-h-screen flex flex-col">
        <main className="flex-grow overflow-auto pt-10 md:pt-16">
          <Routes>
              {/* Main Routes */}
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
              <Route path="notifications" element={<Notifications />} />
              <Route path="user-profile" element={<UserProfile />} />
            </Route>

            {/* Seller Routes */}
            <Route
              path="/seller/*"
              element={
                <ProtectedRoute allowedRoles={["seller"]}>
                  <SellerDashboard />
                </ProtectedRoute>}>
              <Route index element={<SellerItems />} />
              <Route path="upload-item" element={<UploadItem />} />
              <Route path="seller-profile" element={<SellerProfile />} />
            </Route>

              {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="admins" element={<AdminList />} />
              <Route path="items" element={<ItemList />} />
              <Route path="items/:itemId" element={<ItemDetail />} />
              <Route path="sales" element={<SalesList />} />
              <Route path="sellers" element={<SellerList />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/:userId" element={<UserDetail />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;


