import React, { useState } from "react";

const Carteins: React.FC = () => {
  const [selected, setSelected] = useState<string>("All");
  return (
     <div className="pages-container">
       <h1>Carteins Page</h1>
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

export default Carteins;
