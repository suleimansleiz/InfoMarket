import { faBox, faChartBar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import CategorySalesChart from "./CategorySalesChart ";


const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    items: 0,
    sales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
      const res = await api.get("/api/infomarket/v1/admin/dashboard/stats");
      setStats(res.data);
    }catch(error){
      console.error("Failed to fetch dashboard stats:", error);
    }
  };
  fetchStats();
 }, []);

  return (
<div className="dashboard-overview">
  <div className="dash-header">
    <h2>Overview</h2>
  </div>
  <div className="dashboard-cards">
    <div className="dashboard-card">
      <div className="dash-card-name">
        <div className="dash-card-in">
          <h5>Users</h5>
          <h3>{stats.users}</h3>
        </div>
        <FontAwesomeIcon className="dash-card-icons" icon={faUsers} style={{color: 'violet', backgroundColor: 'rgb(255, 205, 255)'}} />
      </div>
      <div className="admin-card-description">
      <FontAwesomeIcon className="admin-card-icons" icon="arrow-trend-up" style={{color: 'lightgreen'}} />
      <p>+8.5% from yesterday</p>
      </div>
    </div>
    <div className="dashboard-card">
      <div className="dash-card-name">
        <div className="dash-card-in">
          <h5>Sellers</h5>
          <h3>{stats.sellers}</h3>
        </div>
        <FontAwesomeIcon className="dash-card-icons" icon={faUser} style={{color: 'blue', backgroundColor: 'lightblue'}} />
      </div>
      <div className="admin-card-description">
      <FontAwesomeIcon className="admin-card-icons" icon="arrow-trend-up" style={{color: 'lightgreen'}} />
      <p>+4 from yesterday</p>
      </div>
    </div>
    <div className="dashboard-card">
    <div className="dash-card-name">
        <div className="dash-card-in">
          <h5>Items</h5>
          <h3>{stats.items}</h3>
        </div>
        <FontAwesomeIcon className="dash-card-icons" icon={faBox} style={{color: 'orange', backgroundColor: 'cornsilk'}} />
      </div>
      <div className="admin-card-description">
      <FontAwesomeIcon className="admin-card-icons" icon="arrow-trend-up" style={{color: 'lightgreen'}} />
      <p>+1.3% from past week</p>
      </div>
    </div>
    <div className="dashboard-card">
    <div className="dash-card-name">
        <div className="dash-card-in">
          <h5>Sales</h5>
          <h3>Tsh {stats.sales.toLocaleString()}</h3>
        </div>
        <FontAwesomeIcon className="dash-card-icons" icon={faChartBar} style={{color: 'green', backgroundColor: 'rgb(199, 247, 199)'}} />
      </div>
      <div className="admin-card-description">
        <FontAwesomeIcon className="admin-card-icons" icon="arrow-trend-down" style={{color: 'red'}} />
        <p>-4.3% from yesterday</p>
      </div>
    </div>
  </div>
    <div className="chart-container">
      <h4>Sales Chart</h4>
        <CategorySalesChart />
    </div>
  </div>

);
};

export default AdminDashboard;
