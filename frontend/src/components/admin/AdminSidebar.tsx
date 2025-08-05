import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faUsers, faChartBar, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const AdminSidebar: React.FC = () => {
return (
    <div className="admin-sidebar">
        <h4 className="sidebar-logo">Admin Panel</h4>
        <nav className="sidebar-nav">
            <NavLink to="/admin/dashboard" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon="grip" /> Overview
            </NavLink>
            <NavLink to="/admin/admins" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon={faCog} /> Admins
            </NavLink>
            <NavLink to="/admin/items" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon={faBox} /> Items
            </NavLink>
            <NavLink to="/admin/sales" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon={faChartBar} /> Sales
            </NavLink>
            <NavLink to="/admin/sellers" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon={faUser} /> Sellers
            </NavLink>
            <NavLink to="/admin/users" className="admin-nav-links active">
                <FontAwesomeIcon className="nav-icons" icon={faUsers} /> Users
            </NavLink>
        </nav>
    </div>
    );
};

export default AdminSidebar;