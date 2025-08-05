import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((p) => p !== "admin"); // Remove "admin"

  if (pathnames.length === 1 && pathnames[0].toLowerCase() === "dashboard") {
    return (
      <nav className="breadcrumb-nav">
        <ul className="breadcrumb-list">
          <li className="active">Dashboard</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="breadcrumb-nav">
      <ul className="breadcrumb-list">
        {pathnames.map((value, index) => {
          const to = "/" + ["admin", ...pathnames.slice(0, index + 1)].join("/");
          const isLast = index === pathnames.length - 1;

          const label = decodeURIComponent(value)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={to} className={isLast ? "active" : ""}>
              {isLast ? <span>{label}</span> : <Link to={to}>{label}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
