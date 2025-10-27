import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-head">
        <AdminHeader />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;