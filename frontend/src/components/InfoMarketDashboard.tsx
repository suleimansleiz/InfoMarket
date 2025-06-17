import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";

const InfoMarketDashboard: React.FC = () => {
  return (
    <div className="mainBody d-flex">
      {/* Sidebar */}
      <nav className="sidebar vh-150 p-3">
        <div className="topbar-left d-flex align-items-center">
          <h4 className="sidebar-title mb-0">InfoMarket</h4>
          <i className="menubtn fas fa-bars me-2"></i>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-home me-2"></i> Home
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="list-group-item">
            <Link
              to="/accessories"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-gem me-2"></i> Accessories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/bags"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-shopping-bag me-2"></i> Bags
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/carteins"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-box me-2"></i> Curteins
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/computers"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-laptop me-2"></i> Computers
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/phones"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-mobile-alt me-2"></i> Phones
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="list-group-item">
            <Link
              to="/settings"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-cog me-2"></i> Settings
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/help"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-question-circle me-2"></i> Help
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/sell-your-item"
              className="text-decoration-none d-flex align-items-center"
            >
              <i className="fas fa-tags me-2"></i> Sell Your Item
            </Link>
          </li>
          <hr className="sidebar-divider" />
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="content flex-grow-1">
        <div className="container mt-4">
          <Outlet /> {/* Dynamic components will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default InfoMarketDashboard;





