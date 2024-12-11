import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
// import Home from "./Home";
// import SellYourItem from "./SellYourItem";
// import CreateAccount from "./CreateAccount";

// const renderMainContent = () => {
//   switch (mainContent) {
//     case "home":
//       return <Home />;
//     case "sellYourItem":
//       return <SellYourItem setMainContent={setMainContent} />;
//     case "createAccount":
//       return <CreateAccount setMainContent={setMainContent} />;
//     default:
//       return <Home />;
//   }
// };


const InfoMarketDashboard: React.FC = () => {
  return (
    <div className="mainBody d-flex">
      {/* Topbar */}
      <div className="topbar d-flex align-items-center p-3">
        <div className="topbar-left d-flex align-items-center">
          <i className="menubtn fas fa-bars me-2"></i>
          <h4 className="sidebar-title mb-0">InfoMarket</h4>
        </div>
        <div className="topbar-middle d-flex align-items-center">
          <input
            className="searchBar form-control"
            type="search"
            placeholder="Search here!"
          />
        </div>
        <div className="topbar-right d-flex align-items-center">
          {/* Notifications go here */}
        </div>
      </div>

      {/* Sidebar */}
      <nav className="sidebar vh-150 p-3">
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
              <i className="fas fa-box me-2"></i> Carteins
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
        <footer className="copyRight mt-auto p-3 text-center">
          <p>
            Copyright © 2024 <b><a href="#">InfoMarket.</a></b> Developed and
            maintained by <b><a href="#">SleizWare Development.</a></b> All
            rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InfoMarketDashboard;





