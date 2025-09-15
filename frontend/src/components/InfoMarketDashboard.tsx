import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faGem,
  faShoppingBag,
  faBox,
  faLaptop,
  faMobile,
  faBell,
  faCog,
  faQuestion,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import SellYourItemModal from "../modals/SellYourItemModal";

const InfoMarketDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showSellYourItemModal, setShowSellYourItemModal] = useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="mainBody d-flex">
      {/* Sidebar */}
      <nav className={`sidebar vh-150 p-3 ${collapsed ? "collapsed" : ""}`}>
        <div className="topbar-left d-flex align-items-center justify-content-between">
          {/* <h4 className="sidebar-title mb-0">InfoMarket</h4> */}
          <button
            className="menu-btn btn btn-link text-decoration-none"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={collapsed ? faBars : faTimes} />
          </button>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <Link
              to="/"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faHome} /> Home
            </Link>
          </li>
          <hr className="sidebar-divider" />

          {/* Repeat for each link */}
          <li className="list-group-item">
            <Link
              to="/accessories"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faGem} /> Accessories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/bags"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon
                className="icons me-2"
                icon={faShoppingBag}
              />{" "}
              Bags
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/curteins"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faBox} /> Curteins
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/computers"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faLaptop} />{" "}
              Computers
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/phones"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faMobile} /> Phones
            </Link>
          </li>
          <hr className="sidebar-divider" />

          <li className="list-group-item">
            <Link
              to="/notifications"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faBell} /> Notifications
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/settings"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon className="icons me-2" icon={faCog} /> Settings
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/help"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={() => collapsed && toggleSidebar()}
            >
              <FontAwesomeIcon
                className="icons me-2"
                icon={faQuestion}
              />{" "}
              Help
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="#"
              className="list-group-link text-decoration-none d-flex align-items-center"
              onClick={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                collapsed && toggleSidebar();
              e.preventDefault();
              setShowSellYourItemModal(true);
            }}
            >
              <FontAwesomeIcon className="icons me-2" icon={faTags} /> Post
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
      <SellYourItemModal
        show={showSellYourItemModal}
        onHide={() => {
          setShowSellYourItemModal(false);
        }  }
      />
    </div>
  );
};

export default InfoMarketDashboard;
