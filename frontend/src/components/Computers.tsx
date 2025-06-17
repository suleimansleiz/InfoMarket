import React, { useState } from "react";

const Computers: React.FC = () => {
    const [selected, setSelected] = useState<string>("All");
  return (
    <div className="pages-container">
      <div className="topbar d-flex align-items-center p-3">
        <div className="topbar-middle d-flex align-items-center">
        <div className="searchBox">
          <img className="searchIcon" src="../assets/search.png" alt="icon" />
          <input
            className="searchBar"
            type="search"
            placeholder="Search here!"
          />
          <button className="searchButton" type="button">Search</button>
        </div>

        </div>
        <div className="topbar-right d-flex align-items-center">
          <div className="notification-bell">
            <i className="fas fa-bell"></i>
            <span className="notification-count">3</span>
          </div>
        </div>
      </div>
    <h1>Computers</h1>
      <div className="button-group">
        <button
          className={`filter-button ${selected === "All" ? "active" : ""}`}
          onClick={() => setSelected("All")}
        >
          All
        </button>
        <button
          className={`filter-button ${selected === "Recents" ? "active" : ""}`}
          onClick={() => setSelected("Recents")}
        >
          Recents
        </button>
        <button
          className={`filter-button ${selected === "Favorites" ? "active" : ""}`}
          onClick={() => setSelected("Favorites")}
        >
          Favorites
        </button>
      </div>
        {/* Items Container */}
      <div className="items-container">
        <p className="no-items-message">No Item posts for now</p>
      </div>
    </div>
  )
};

export default Computers;
