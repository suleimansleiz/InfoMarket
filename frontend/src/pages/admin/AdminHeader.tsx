import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProfile from "./AdminProfile";
import { NavLink } from "react-router-dom";
import Breadcrumbs from "../mini-components/Breadcrumbs";

const AdminSidebar: React.FC = () => {
    return (
    <div className="admin-header">
        <div className="admin-breadcrumbs">
            <Breadcrumbs />
        </div>
        <div className="admin-search-bar">
            <img className="search-icon" src="../assets/search.png" alt="icon" />
            <input className="search-bar" type="search" placeholder="Search here!" />
            <button className="search-btn" type="button">Search</button>
        </div>
        <div className="header-profile d-flex ">
        <NavLink to="" className="notification-btn">
            <FontAwesomeIcon className="header-icon" icon={['far', 'bell']} />
        </NavLink>
            <div className="admin-name">
                <h5 className="admin-name mb-0">{localStorage.getItem("adminName")}</h5>
                <p className="admin-role mb-0">{localStorage.getItem("role")}</p>
            </div>
            <div className="admin-img">
            <AdminProfile imageUrl="../../assets/blank-profile-pic.png" />
            </div>
        </div>
    </div>
    );
    };

export default AdminSidebar;
