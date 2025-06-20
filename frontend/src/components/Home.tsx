import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import PaginationControls from "./PaginationControls";
import ExpandedItemCard from "./ExpandedItemCard";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfileDropdown from "./UserProfileDropdown";

interface Item {
  item_id: string;
  item_photo?: string;
  item_name: string;
  item_price: string;
  item_category: string;
  item_description: string;
  seller_name: string;
  seller_phone: string;
}

const Home: React.FC = () => {
  const [selected, setSelected] = useState<string>("All");
  const [items, setItems] = useState<Item[]>([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));


  // Pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLoginSuccess = () => {
    
  };

  const handleSignupSuccess = () => {
    setShowLoginModal(true);
  };


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/infomarket/v1/items", {});
        const data = response.data.items || response.data;
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = async (type: string) => {
    setSelected(type);
  
    try {
      let response;
  
      if (type === "All") {
        response = await api.get("/api/infomarket/v1/items");
      } else if (type === "Recents") {
        response = await api.get("/api/infomarket/v1/items/recent");
      } else {
        // Placeholder for future "Favorites"
        setItems([]);
        return;
      }
  
      const data = response.data.items || response.data;
      setItems(Array.isArray(data) ? data : []);
      setCurrentPage(1); // Reset to page 1 after filter change
    } catch (error) {
      console.error(`Failed to fetch ${type} items:`, error);
    }
  };

  return (
    <div className="pages-container">
      <div className="topbar d-flex align-items-center p-3">
        <div className="topbar-middle d-flex align-items-center">
          <div className="searchBox">
            <img className="searchIcon" src="../assets/search.png" alt="icon" />
            <input className="searchBar" type="search" placeholder="Search here!" />
            <button className="searchButton" type="button">Search</button>
          </div>
        </div>
        <div className="topbar-right d-flex align-items-center">
          {user ? (
            <span className="username-display">
              <h5 className="seller-name mb-0">{user}</h5>
              <UserProfileDropdown imageUrl="../../assets/blank-profile-pic.png" />
              </span>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>Log in</button>
              <button className="signup-btn" onClick={() => setShowSignupModal(true)}>Sign up</button>
            </>
          )}
        </div>
      </div>

      <h1 className="welcome-header text-center">Welcome to InfoMarket</h1>

      <div className="button-group">
  {["All", "Recents", "Favorites"].map((type) => (
    <button
      key={type}
      className={`filter-button ${selected === type ? "active" : ""}`}
      onClick={() => handleFilterChange(type)}
    >
      {type}
    </button>
  ))}
</div>


      {/* Items */}
      <div className="items-container">
        {paginatedItems.length === 0 ? (
          <p className="no-items-message">Check your internet then reload the page</p>
        ) : (
          paginatedItems.map((item) => (
            <div className="item-card" key={item.item_id}>
              <div
                className="item-image"
                style={{ backgroundImage: `url(${item.item_photo})` }}
              />
              <div className="item-details">
                <div>
                  <h5>{item.item_name}</h5>
                  <p>Tsh {item.item_price.toLocaleString()}</p>
                </div>
                <div className="icon-btn">
                <button className="expand-button" onClick={() => openModal(item)}>
                <FontAwesomeIcon icon="arrow-down" />
                </button>
                  <button className="favorite-button">
                  <FontAwesomeIcon icon={["far", "heart"]} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination-container">
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(items.length / itemsPerPage)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>

      <ExpandedItemCard
        show={showModal}
        onHide={closeModal}
        item={selectedItem}
      />

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignupModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        onSignupSuccess={handleSignupSuccess}
      />
    </div>
  );
};

export default Home;
