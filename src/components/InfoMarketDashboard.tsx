import React from "react";
import "../App.css";
import Home from "./Home";

const InfoMarketDashboard: React.FC = () => {
  return (
    <div className="mainBody d-flex">
        <div className="topbar d-flex align-items-center p-3">
          <div className="topbar-left d-flex align-items-center">
            <i className="menubtn fas fa-bars me-2"></i>
            <h4 className="sidebar-title mb-0">InfoMarket</h4>
          </div>
          <div className="topbar-middle d-flex align-items-center">
            <input
            className="searchBar form-control "
            type="search"
            placeholder="Search here!"
          />
          </div>
             <div className="topbar-right d-flex align-items-center">
            {/* Notifications go here*/}
          </div>
        </div>
      {/* Sidebar */}
      <nav className="sidebar vh-150 p-3">
        <ul className="list-group list-group-flush">
          {/* Group 1: Home */}
          <li className="list-group-item">
            <a href="#home" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-home me-2"></i> Home
            </a>
          </li>
          <hr className="sidebar-divider" />

          {/* Group 2: Accessories, Bags, Carteins, Computers, Phones */}
          <li className="list-group-item">
            <a href="#accessories" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-gem me-2"></i> Accessories
            </a>
          </li>
          <li className="list-group-item">
            <a href="#bags" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-shopping-bag me-2"></i> Bags
            </a>
          </li>
          <li className="list-group-item">
            <a href="#carteins" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-box me-2"></i> Carteins
            </a>
          </li>
          <li className="list-group-item">
            <a href="#computers" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-laptop me-2"></i> Computers
            </a>
          </li>
          <li className="list-group-item">
            <a href="#phones" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-mobile-alt me-2"></i> Phones
            </a>
          </li>
          <hr className="sidebar-divider" />

          {/* Group 3: Settings, Help, Sell Your Item */}
          <li className="list-group-item">
            <a href="#settings" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-cog me-2"></i> Settings
            </a>
          </li>
          <li className="list-group-item">
            <a href="#help" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-question-circle me-2"></i> Help
            </a>
          </li>
          <li className="list-group-item">
            <a href="#sellYourItem" className="text-decoration-none d-flex align-items-center">
              <i className="fas fa-tags me-2"></i> Sell Your Item
            </a>
          </li>
          <hr className="sidebar-divider" />
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content flex-grow-1">
        <div className="container mt-4">
          <Home />
          <footer className="copyRight mt-auto p-3 text-center">
          <p>
            Copyright © 2024 <b><a href="#">InfoMarket.</a></b> Developed and maintained by <b><a href="#">SleizWare Development.</a></b> All rights reserved.
          </p>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default InfoMarketDashboard;


