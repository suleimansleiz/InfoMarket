import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              <FontAwesomeIcon className="icons" icon="home" /> Home
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="list-group-item">
            <Link
              to="/accessories"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="gem" /> Accessories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/bags"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="shopping-bag" /> Bags
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/carteins"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="box" /> Curteins
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/computers"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="laptop" /> Computers
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/phones"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="mobile" /> Phones
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <li className="list-group-item">
            <Link
              to="/settings"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="bell" /> Notifications
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/settings"
              className="nav-link text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="cog" /> Settings
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/help"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="question" /> Help
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/sell-your-item"
              className="text-decoration-none d-flex align-items-center"
            >
              <FontAwesomeIcon className="icons" icon="tags" /> Sell Your Item
            </Link>
          </li>
          <hr className="sidebar-divider" />
        </ul>
      </nav>

      <div className="content flex-grow-1">
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InfoMarketDashboard;





