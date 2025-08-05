import { Outlet } from "react-router-dom";
import React from "react";

const AdminRoutes: React.FC = () => {
//   const role = localStorage.getItem("role");

//   if (role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminRoutes;
